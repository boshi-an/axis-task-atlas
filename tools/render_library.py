from pathlib import Path
from html import escape as h
import json

web = Path(__file__).resolve().parents[1]
full = json.loads((web / "task-library.json").read_text())
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


def native_counts(task, run):
    if task == "fr3v2_jf_pick":
        return run["picked"], run["pick_attempts"]
    if task == "fr3v2_jf_place":
        return run["place_successes"], run["place_attempts"]
    return run["successes"], run["attempts"]


def stage_rate(wins, count):
    return fmt({"successes": wins, "attempts": count}) if count else "No valid handoffs"


def native_table(task, runs):
    key = task["id"]
    population = {
        "fr3v2_jf_pick": "Pick entries",
        "fr3v2_jf_place": "valid Place handoffs",
        "fr3v2_jf_pick_place": "all home starts",
    }[key]
    html = [
        f"<h3>Frozen FR3v2 evaluations</h3><p>Normal starts on axis2, scored over {population}.</p>"
    ]
    for kind in ("student", "teacher"):
        group = [r for r in runs if r["policy"] == kind]
        counts = [native_counts(key, r) for r in group]
        score = stage_rate(sum(w for w, n in counts), sum(n for w, n in counts))
        html.append(f"<p><strong>{kind.capitalize()}</strong> · {score}</p>")
    html.append(
        "<table><caption>Object-level results</caption><thead><tr><th>Object</th><th>Policy</th><th>Seed</th><th>Success</th></tr></thead><tbody>"
    )
    names = {
        6671: "Butter",
        6672: "Orange juice",
        6673: "Chocolate pudding",
        6674: "Barbecue sauce",
        6675: "Tomato sauce",
    }
    for r in runs:
        wins, n = native_counts(key, r)
        html.append(
            f"<tr><td>{names[r['object_id']]} ({r['object_id']})</td><td>{h(r['policy'])}</td><td>{r['seed']}</td><td>{stage_rate(wins, n)}</td></tr>"
        )
    html.append(
        "</tbody></table><p>The barbecue sauce teacher had a second batch of eight after the first four starts yielded no valid Place handoffs. Both batches are shown.</p>"
    )
    return "".join(html)


def heading(r):
    return {
        "I2RT/YAM · task-specific scenes": "I2RT / YAM",
        "Dual I2RT/YAM · shared tabletop": "I2RT / YAM",
    }.get(r["embodiment"], r["embodiment"])


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
    f"<p>{full['coverage']['implementations']} OmniReset environments, {len(rows) - len(core)} aliases and {len(full['coverage']['native_source_tasks'])} original FR3v2 tasks on <code>axis</code>. Open a task for its starting conditions, success criterion, dimensions, files and frozen-policy results. Each score uses the robot on which the policy trained. Updated {full['as_of']}.</p>",
    f"<p>All {full['i2rt_physics_qualification']['tasks_verified']} I2RT tasks share the dual-arm ABC Box V4 robot, its USD joint gains and friction, and a 15 Hz control loop over ten 150 Hz physics ticks. PhysX uses TGS with 64 position iterations and one velocity iteration. Each task passed a live robot-parameter comparison on axis.</p>",
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
for i, g in enumerate(groups):
    parts.append(f'<section id="group-{i}"><h2>{h(g)}</h2>')
    for r in sorted([r for r in core if heading(r) == g], key=lambda x: x["id"]):
        k = r["id"]
        qs = [
            scores[j]
            for j in r["scores"]
            if matches(r, scores[j]) and scores[j]["task"] == k
        ]
        normal = [e for e in qs if e["scope"] == "registered task"]
        delivered = [e for e in qs if e["scope"] == "native delivery"]
        score = (
            fmt(normal[0])
            if len(normal) == 1
            else f"{len(normal)} evaluated policies"
            if normal
            else (
                "Frozen delivery · " + fmt(delivered[0])
                if delivered
                else r["expert_status"]
            )
        )
        fresh = (
            [run for run in full["source_fr3v2_full_episodes"] if matches(r, run)]
            if k in full["coverage"]["native_source_tasks"]
            else []
        )
        if fresh:
            pairs = [
                native_counts(k, run) for run in fresh if run["policy"] == "student"
            ]
            score = "Visual student · " + stage_rate(
                sum(w for w, n in pairs), sum(n for w, n in pairs)
            )
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
        ]
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
            parts.append(
                "<table><caption>Frozen-policy evaluations on axis</caption><thead><tr><th>Policy or configuration</th><th>Success</th><th>Protocol</th></tr></thead><tbody>"
            )
            for e in qs:
                parts.append(
                    f"<tr><td>{h(e['policy'])}</td><td>{fmt(e)}</td><td>{h(e['protocol'])} Code <code>{h(e['revision'])}</code>.</td></tr>"
                )
            parts.append("</tbody></table>")
        if fresh:
            parts.append(native_table(r, fresh))
        jf = [
            e
            for e in full.get("source_fr3v2_benchmarks", [])
            if e["task"] == k and matches(r, e)
        ]
        if jf:
            parts.append(
                "<table><caption>Original FR3v2 source evaluations</caption><thead><tr><th>Network</th><th>Success</th><th>Population</th></tr></thead><tbody>"
            )
            for e in jf:
                label = e["kind"].replace("_", " ").capitalize() + (
                    f" · {e['object_id']}" if e["object_id"] else ""
                )
                parts.append(
                    f"<tr><td>{h(label)}</td><td>{fmt(e)}</td><td>{h(e['protocol'])}</td></tr>"
                )
            parts.append("</tbody></table>")
        if r.get("prior_physics_evaluations"):
            parts.append("<details><summary>Archived evaluations on earlier physics</summary><ul>")
            for z in r["prior_physics_evaluations"]:
                if matches(r, z):
                    parts.append(f"<li>{h(z['policy'])} · {fmt(z)}. {h(z['protocol'])}</li>")
            parts.append("</ul></details>")
        if r.get("archived_scores"):
            parts.append("<p><b>Original author evaluations</b> (1 Nov 2026)</p><ul>")
            for j in r["archived_scores"]:
                z = full["archived_evaluations"][j]
                if z["task"] != k or not matches(r, z):
                    continue
                parts.append(
                    f"<li>{h(z['policy'])} · {fmt(z)} · {h(z['starts'])} starts.</li>"
                )
            parts.append("</ul>")
        if k in full.get("additional_source_benchmarks", {}):
            parts.append("<p><b>Archived source benchmarks</b></p><ul>")
            for z in full["additional_source_benchmarks"][k]:
                if z["task"] != k or not matches(r, z):
                    continue
                parts.append(
                    f"<li>{h(z['policy'])} · {fmt(z)} · {h(z['protocol'])}</li>"
                )
            parts.append("</ul>")
        if "original_benchmark" in r and matches(r, r["original_benchmark"]):
            z = r["original_benchmark"]
            parts.append(
                f"<p><b>Archived fixed-I1 A100 delivery benchmark</b> · 97.9933% ({z['successes']:,}/{z['attempts']:,}). {h(z['protocol'])}</p>"
            )
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
const entries=Array.from(document.querySelectorAll('details'));
function locate(){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;const node=document.getElementById(id)||entries.find(row=>row.dataset.aliases.split(' ').includes(id));if(node&&node.tagName==='DETAILS'){node.open=true;node.scrollIntoView();}}
document.getElementById('filter').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();for(const row of entries)row.hidden=!row.dataset.search.includes(q);for(const group of document.querySelectorAll('main section'))group.hidden=!group.querySelector('details:not([hidden])');});window.addEventListener('hashchange',locate);locate();
</script></body></html>""")
(web / "library.html").write_text("\n".join(parts) + "\n")
