from fractions import Fraction
from pathlib import Path
from html import escape as h
import json

web = Path(__file__).resolve().parents[1]
full = json.loads((web / "task-library.json").read_text())
physics = full["i2rt_physics_qualification"]
rows = full["tasks"]
by = {r["id"]: r for r in rows}
scores = full["evaluations"]
core = [r for r in rows if r["id"] == r["canonical_id"]]


def fmt(x):
    return (
        f"{100 * x['successes'] / x['attempts']:.2f}".rstrip("0").rstrip(".")
        + f"% ({x['successes']:,}/{x['attempts']:,})"
    )


def matches(task, run):
    return (
        run.get("training_embodiment")
        == task["embodiment_id"]
        == run.get("evaluation_embodiment")
    )


def task_link(key):
    return f'<a href="#{h(key)}">{h(by[key]["task"])} · <code>{h(key)}</code></a>'


def success_fraction(run):
    return Fraction(run["successes"], run["attempts"])


def heading(r):
    return {
        "I2RT/YAM · task-specific scenes": "I2RT / YAM",
        "Dual I2RT/YAM · shared tabletop": "I2RT / YAM",
    }.get(r["embodiment"], r["embodiment"])


progress = full['evaluation_progress']
groups = [
    "I2RT / YAM",
    "Franka Panda",
    "Franka FR3v2",
    "Dual ARX X5",
    "Planar point mass",
]
style = """*{box-sizing:border-box}html{scroll-behavior:smooth}body{font:16px/1.5 Inter,Arial,sans-serif;color:#232721;background:#f6f6f1;margin:0}@font-face{font-family:Inter;src:url(assets/inter-latin.woff2)}header,main,footer{max-width:1160px;margin:auto;padding:22px clamp(16px,3vw,40px)}header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #bebfb7}header strong{letter-spacing:.08em}a{color:#255d49;text-underline-offset:.18em}h1{font-size:clamp(34px,5vw,62px);line-height:1.05;margin:1em 0 .25em;letter-spacing:-.05em}h2{margin:2em 0 .5em}p{max-width:82ch}nav{display:flex;gap:14px;flex-wrap:wrap}code{font-size:.88em;overflow-wrap:anywhere}details{scroll-margin-top:12px;background:#fff;border:1px solid #ddded7;border-radius:6px;margin:6px 0}details[open]{border-color:#759883}summary{cursor:pointer;padding:14px 16px}summary strong{margin-right:12px}summary small{float:right;color:#43584c}details>div{padding:0 18px 12px}dt{font-weight:650;margin-top:12px}dd{margin:2px 0}ul{padding-left:22px}li{margin:.25em 0}table{border-collapse:collapse;width:100%}td,th{text-align:left;border-bottom:1px solid #ddd;padding:7px 8px;vertical-align:top}input{width:100%;padding:10px 12px;font:inherit;border:1px solid #afb8ae;border-radius:4px}footer{margin-top:3em} @media(max-width:650px){summary small{float:none;display:block}td,th{padding:4px;font-size:14px}}"""
parts = [
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Task library and expert evaluations · Axis OmniReset</title><style>'
    + style
    + '</style></head><body><header><strong>AXIS / OmniReset</strong><a href="index.html">Task atlas</a></header><main><h1>Task library</h1>',
    f"<p>{full['coverage']['implementations']} OmniReset environments, {len(rows) - len(core)} aliases and {len(full['coverage']['native_source_tasks'])} original FR3v2 tasks on <code>axis</code>. Open a task for its starting conditions, success criterion, dimensions, files and frozen-policy results. {progress['completed']} of {progress['total']} expert evaluations are complete. Scores are published after every required start for that model has been evaluated. For tasks with several evaluated experts, the summary shows the highest rate on that task and robot. Each result identifies its policy and evaluation conditions. Updated {full['as_of']}.</p>",
    f"<p>All {physics['tasks_verified']} I2RT tasks use the dual-arm ABC Box V4 robot with joint gains and friction from its USD. Each {physics['control_hz']} Hz control action runs for {physics['substeps']} physics steps at {physics['physics_hz']} Hz. PhysX uses {h(physics['solver'])} with {physics['position_iterations']} position iterations and {physics['velocity_iterations']} velocity iteration. Each task’s timing and robot parameters were checked on axis.</p>",
    "<p>Server library root <code>"
    + h(full["root"])
    + '</code>. Resource paths are relative to this directory. <a href="task-library.json">Download the inventory and evaluation results</a>.</p>',
    '<nav aria-label="Embodiments">'
    + "".join(f'<a href="#group-{i}">{h(g)}</a>' for i, g in enumerate(groups))
    + '</nav><p><label for="filter">Find a task or alias</label><input type="search" id="filter" placeholder="Task ID or name"></p>',
]
names = {
    "assets": "Assets",
    "experts": "Policy files",
    "trajectories": "Trajectories and replay",
    "reset_banks": "Reset banks",
}
best_experts = {}
for i, g in enumerate(groups):
    parts.append(f'<section id="group-{i}"><h2>{h(g)}</h2>')
    for r in sorted([r for r in core if heading(r) == g], key=lambda x: x["id"]):
        k = r["id"]
        qs = [
            scores[j]
            for j in r["scores"]
            if matches(r, scores[j]) and scores[j]["task"] == k
        ]
        ranked = sorted((e for e in qs if e["group"] == "primary" and e["attempts"] > 0),
                        key=lambda e: (success_fraction(e), e["attempts"]), reverse=True)
        multiple = len({e["policy"] for e in ranked}) > 1
        score = r["expert_status"]
        winner_label = None
        if ranked:
            best = ranked[0]
            score = fmt(best)
            if multiple:
                score = "Best expert · " + score
                tied = {e["policy"] for e in ranked if success_fraction(e) == success_fraction(best)}
                winner_label = best["policy"]
                others = len(tied) - 1
                if others:
                    noun = "policy" if others == 1 else "policies"
                    winner_label += f" (tied with {others} other {noun})"
                best_experts[k] = dict(policy=best["policy"], successes=best["successes"],
                                       attempts=best["attempts"], protocol=best["protocol"],
                                       tiedPolicies=len(tied), embodimentId=r["embodiment_id"])
            elif best.get("scope") == "native delivery":
                score = "Frozen delivery · " + score
        parts.append(
            f'<details id="{k}" data-aliases="{h(" ".join(r["aliases"]))}" data-search="{h(" ".join([k, r["task"], *r["aliases"]]).lower())}"><summary><strong>{h(r["task"])}</strong><code>{h(k)}</code><small>{h(score)}</small></summary><div><dl>'
        )
        vals = [
            ("Aliases", ", ".join(r["aliases"])),
            ("Start", r["start"]),
            ("Success", r["success"]),
            (
                "Observation / action",
                str(r["observation_dim"])
                + " / "
                + str(r["action_dim"])
                + " · "
                + r["clock"],
            ),
            ("Visual student input", r.get("observation_detail")),
            ("Objects", r.get("variants")),
            ("Runtime", r.get("entrypoint")),
            ("Expert availability", r["expert_status"]),
            ("Expert input", r.get("expert_input")),
        ]
        if winner_label:
            vals.append(("Highest-scoring policy", winner_label))
        for label, val in vals:
            if val:
                parts.append(f"<dt>{label}</dt><dd>{h(val)}</dd>")
        if r.get("original_task"):
            parts.append(
                "<dt>Original robot task</dt><dd>"
                + task_link(r["original_task"])
                + "</dd>"
            )
        if r.get("i2rt_variants"):
            parts.append(
                "<dt>I2RT versions</dt><dd>"
                + ", ".join(map(task_link, r["i2rt_variants"]))
                + "</dd>"
            )
        if k in full["coverage"]["native_source_tasks"]:
            related = [
                key for key in full["coverage"]["native_source_tasks"] if key != k
            ]
            parts.append(
                "<dt>Related FR3v2 tasks</dt><dd>"
                + ", ".join(map(task_link, related))
                + "</dd>"
            )
        parts.append(
            f"<dt>Server directory</dt><dd><code>{h(r['by_task'])}/</code></dd></dl>"
        )
        if qs:
            parts.append("<table><caption>Complete frozen-policy evaluations</caption><thead><tr><th>Policy</th><th>Success</th><th>Evaluated conditions</th></tr></thead><tbody>")
            secondary = [e for e in qs if e not in ranked]
            for e in ranked + secondary:
                value = fmt(e) if e["attempts"] else "No valid handoffs"
                parts.append(f"<tr><td>{h(e['policy'])}</td><td>{value}</td><td>{h(e['protocol'])}</td></tr>")
            parts.append("</tbody></table>")
        parts.append("<dl>")
        for role, label in names.items():
            v = r["resources"][role]
            parts.append(
                f"<dt>{label}</dt><dd>"
                + (
                    "<ul>"
                    + "".join("<li><code>" + h(path) + "</code></li>" for path in v)
                    + "</ul>"
                    if v
                    else "No released resource located."
                )
                + "</dd>"
            )
        parts.append("</dl></div></details>")
    parts.append("</section>")
parts.append("""</main><footer><a href="index.html">Back to the atlas</a></footer><script>
const entries=Array.from(document.querySelectorAll('details[data-search]'));
function locate(){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;const node=document.getElementById(id)||entries.find(row=>row.dataset.aliases.split(' ').includes(id));if(node&&node.tagName==='DETAILS'){node.open=true;node.scrollIntoView();}}
document.getElementById('filter').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();for(const row of entries)row.hidden=!row.dataset.search.includes(q);for(const group of document.querySelectorAll('main section'))group.hidden=!group.querySelector('details[data-search]:not([hidden])');});window.addEventListener('hashchange',locate);locate();
</script></body></html>""")
(web / "library.html").write_text("\n".join(parts) + "\n")

# Embed the same winners for the gallery, including when opened directly from disk.
gallery_file = web / "catalog-data.js"
header, assignment, payload = gallery_file.read_text().partition("window.AXIS_ATLAS = ")
gallery = json.loads(payload.rstrip().removesuffix(";"))
gallery["bestExperts"] = best_experts
gallery_file.write_text(header + assignment + json.dumps(gallery, ensure_ascii=False, indent=2) + ";\n")
