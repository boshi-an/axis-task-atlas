/* Registry and evidence snapshot. This file also loads with file://. */
window.AXIS_ATLAS = {
  "revision": "e465d482f48173be015a2bb776ec7e9ec621d2b2",
  "tasks": [
    {
      "id": "i2rt_grasp1000",
      "title": "Grasp1000",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Grasp an object from a fixed home pose, lift it 5 cm with contact on both fingers, and hold it clear of the table for nine control steps.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 1039,
      "obs": "981 source-layout features include virtual Panda left-hand channels, object shape, contact and milestone state, and controller history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_grasp1000/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        },
        {
          "label": "Task contract",
          "path": "doc/pipeline/active/state_rl/general_grasp/shared_grasp1000.md"
        }
      ],
      "expert": {
        "runnable": true,
        "name": "Fixed-home Grasp1000 with I2RT action projection",
        "recipe": "FlashSAC with 3-step returns, a 0.99 discount, BPS object features and 20 Hz SysID control. The frozen policy averages actor parameters and batch-normalization statistics from rounds 15 and 20. At evaluation the actor reads the 981 source features. The task projects its commands to the left I2RT tool and gripper.",
        "trainer": "Franka1000 delivery team (jupiter2143).",
        "evaluation": {
          "taskId": "i2rt_grasp1000",
          "revision": "e465d482",
          "obsDim": 1039,
          "actionDim": 14,
          "successes": 0,
          "attempts": 4,
          "protocol": "Frozen grasp actor on the shared I2RT tabletop with the Panda policy projection, four starts, seed 42. See the full task library for checkpoints and evaluation receipts."
        },
        "sources": [
          {
            "label": "Evaluation receipts",
            "path": "./expert-evidence.json"
          },
          {
            "label": "Frozen-policy evaluator",
            "path": "src/axis_omnireset/training/grasp1000_evaluation.py"
          }
        ],
        "nativeBenchmark": "franka1000",
        "availability": "Evaluated on axis",
        "previousEvaluation": {
          "taskId": "i2rt_grasp1000",
          "revision": "4d8c53421496f5ce8bb49a97621bf1b99964eb9b",
          "obsDim": 1039,
          "actionDim": 14,
          "successes": 0,
          "attempts": 4,
          "protocol": "Four episodes on the default four-slot population, one fresh start per slot, seed 42. Each episode ran to termination or timeout."
        }
      },
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The fixed-home grasp task samples object poses. Each of the 1,000 slots identifies an object instance. Frozen-policy evaluation episodes are a separate population.",
        "sources": [
          {
            "label": "Fixed-home Grasp1000 delivery",
            "path": "doc/pipeline/active/state_rl/general_grasp/franka1000.md"
          },
          {
            "label": "Grasp1000 embodiment contracts",
            "path": "doc/pipeline/active/state_rl/general_grasp/shared_grasp1000.md"
          }
        ]
      },
      "render": {
        "file": "images/i2rt_grasp1000.webp",
        "caption": "RTX rendering of a seeded simulator reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "e465d482"
    },
    {
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "id": "i2rt_jf_pick",
      "title": "JF object pick",
      "description": "Lift one of six objects by 5 cm and hold it with the same two fingertips for 0.4 seconds.",
      "obsDim": 172,
      "obs": "Seven 13D object poses and twists (target, container, then clutter), seven presence bits, six object-ID bits, four fingertip forces, target rise, two grip-hold durations, placement stability time and two last-holder flags. The final 58 values are the measured joint and tool states of both I2RT arms.",
      "schemaNote": "Select the object in the task config: butter (6671), orange juice (6672), pudding (6673), barbecue sauce (6674), tomato sauce (6675) or marker (6703). The groceries use a wicker basket. The marker uses a cardboard box. Both skills default to butter.",
      "aliases": [],
      "expert": null,
      "sources": [
        {
          "label": "Shared implementation and usage",
          "path": "src/axis_omnireset/tasks/jf_tabletop/README.md"
        },
        {
          "label": "Physical checkers",
          "path": "src/axis_omnireset/tasks/jf_tabletop/checker.py"
        },
        {
          "label": "Integration results",
          "path": "doc/pipeline/active/state_rl/atomic_skills/jf_tabletop_checks.json"
        }
      ],
      "refs": {
        "count": 0,
        "summary": "Fresh procedural layouts",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The reset sampler draws object positions and yaw from the scene configuration.",
        "sources": []
      },
      "render": {
        "file": "images/i2rt_jf_pick.webp",
        "kind": "Simulator reset",
        "source": "Seeded RTX render on axis, seed 42, environment 0, JF 6671",
        "caption": "Shared I2RT desk at reset, object 6671. The inset shows the butter at its measured pose."
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "id": "i2rt_jf_place",
      "title": "JF object placement",
      "description": "Grasp an object from the desk and release it in its container. The object must stay stable for 0.4 seconds.",
      "obsDim": 172,
      "obs": "Seven 13D object poses and twists (target, container, then clutter), seven presence bits, six object-ID bits, four fingertip forces, target rise, two grip-hold durations, placement stability time and two last-holder flags. The final 58 values are the measured joint and tool states of both I2RT arms.",
      "schemaNote": "Select the object in the task config: butter (6671), orange juice (6672), pudding (6673), barbecue sauce (6674), tomato sauce (6675) or marker (6703). The groceries use a wicker basket. The marker uses a cardboard box. Both skills default to butter.",
      "aliases": [],
      "expert": null,
      "sources": [
        {
          "label": "Shared implementation and usage",
          "path": "src/axis_omnireset/tasks/jf_tabletop/README.md"
        },
        {
          "label": "Physical checkers",
          "path": "src/axis_omnireset/tasks/jf_tabletop/checker.py"
        },
        {
          "label": "Integration results",
          "path": "doc/pipeline/active/state_rl/atomic_skills/jf_tabletop_checks.json"
        }
      ],
      "refs": {
        "count": 0,
        "summary": "Fresh procedural layouts",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The reset sampler draws object positions and yaw from the scene configuration.",
        "sources": []
      },
      "render": {
        "file": "images/i2rt_jf_place.webp",
        "kind": "Simulator reset",
        "source": "Seeded RTX render on axis, seed 42, environment 0, JF 6703",
        "caption": "Shared I2RT desk at reset, object 6703. The inset shows the marker at its measured pose."
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "5033",
      "title": "Chess-piece placement",
      "robot": "Franka Panda",
      "group": "Panda",
      "profile": "Native V48 placement",
      "description": "Lift the chess piece, move it into the goal region relative to the figurine, then release it onto a supporting surface.",
      "actionDim": 7,
      "action": "A measured-hand Cartesian increment (3 translation, 3 rotation) and a gripper command. The guarded gripper executes through the native controller. Translation scale 0.025 m; rotation scale 0.0833 rad.",
      "obsDim": 105,
      "obs": "Arm and finger proprioception, hand and scene-object poses, relative goal geometry, articulation state, and previous command.",
      "clock": "24 Hz control · 120 Hz physics · 5 substeps",
      "aliases": [
        "panda_task5033"
      ],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/task5033/task.py"
        }
      ],
      "expert": {
        "runnable": true,
        "availability": "Evaluated on axis",
        "name": "5033 frozen policy",
        "sources": [],
        "evaluation": {
          "taskId": "5033",
          "revision": "e465d482",
          "obsDim": 105,
          "actionDim": 7,
          "successes": 27,
          "attempts": 28,
          "protocol": "First complete episode on each initially admitted native curriculum slot, deterministic RSL-RL inference. See the full task library for checkpoints and evaluation receipts."
        }
      },
      "refs": {
        "count": 302,
        "summary": "Source Franka recordings",
        "length": "Source controls at 5 Hz: min 13, Q1 41, median 54, Q3 83, max 475.",
        "success": "100% (302/302) carry the original goal-achieved label. Separately, 259/302 passed the source replay qualification.",
        "notes": "One Chess scene. 22,541 archived states including one initial frame per recording. The percentages describe the supplied recordings.",
        "sources": [
          {
            "label": "V48 archive reproduction",
            "path": "doc/platform/reproducibility.md"
          },
          {
            "label": "Franka archive decoder",
            "path": "src/axis_omnireset/data/raw_franka_bank.py"
          }
        ],
        "quartiles": {
          "unit": "Control steps",
          "values": [
            13,
            41,
            54,
            83,
            475
          ]
        }
      },
      "render": {
        "file": "images/5033.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/task5033-scene.jpg"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "10717",
      "title": "Press by number",
      "robot": "Dual ARX X5",
      "group": "ARX X5",
      "profile": "Native RoboDojo",
      "description": "Read two digit cards, press the red and blue buttons in the required counts and order, then return both arms home.",
      "actionDim": 12,
      "action": "Left then right TCP translation and rotation-vector deltas, normalized to [−1, 1]. Gripper opening is determined by the task phase.",
      "obsDim": 114,
      "obs": "Robot and button joint states, drive targets, TCP and button geometry, requested digits, press counts, phase and action history.",
      "clock": "25 Hz control · 250 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/task10717/task.py"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The registered native task consumes RoboDojo press-by-number layouts. The asset manifest lists 431 files for this task and no reference recording bundle.",
        "sources": [
          {
            "label": "Button task configuration",
            "path": "src/axis_omnireset/tasks/task10717/config.json"
          },
          {
            "label": "Locked source assets",
            "path": "locks/artifacts.json"
          }
        ]
      },
      "render": {
        "file": "images/10717.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/task10717-scene.jpg"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "i2rt_wood_stack_second",
      "title": "Stack the second block",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Place the held cube on a supported base. The tower must settle with at most 3 mm of center offset and at least 80% overlap.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 130,
      "obs": "Two 13-value block states, goal XYZ and active-block-to-goal vector, contact forces, grasp and release flags, stable time and episode progress. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/wood_blocks/i2rt.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        },
        {
          "label": "Task contract",
          "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "Reset-state bank only",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "27,561 source states are available for retargeted resets. The 32 native Panda teacher episodes use a different robot, observation and action contract and have no shared-I2RT trajectory conversion.",
        "sources": [
          {
            "label": "Wood-block reset and episode contracts",
            "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
          }
        ]
      },
      "render": {
        "file": "images/i2rt_wood_stack_second.webp",
        "caption": "RTX rendering of a seeded simulator reset. The inset shows the working object in the same reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "10724",
      "title": "Stack three blocks",
      "robot": "Dual ARX X5",
      "group": "ARX X5",
      "profile": "Native RoboDojo",
      "description": "Stack three blocks in any order, satisfy the layout’s alignment check, then return both arms home.",
      "actionDim": 14,
      "action": "Default Cartesian mode commands XYZ, a rotation vector and absolute gripper opening per arm. An alternate mode accepts six joint increments and a gripper per arm.",
      "obsDim": 151,
      "obs": "Dual robot and gripper state, block poses, velocities and dimensions, relative stacking geometry, progress and action history.",
      "clock": "25 Hz control · 250 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/task10724/task.py"
        }
      ],
      "expert": null,
      "refs": {
        "count": 1202,
        "summary": "Verified production human demonstrations",
        "length": "143,681 source frames (119.5 mean). Nominal recording spans at 5 Hz: 610 episodes at or below 22 s; 592 above 22 s.",
        "success": "100% (1,202/1,202) by the source goal and verification labels in this selected cohort. Native replay success is unreported.",
        "notes": "165 ARX layouts; train/dev/test contain 971/95/136 recordings. The published split uses 116,975/11,285/15,421 frames respectively. The environment acts at 25 Hz.",
        "sources": [
          {
            "label": "Stack Blocks demonstrations and split",
            "path": "src/axis_omnireset/tasks/task10724/README.md"
          },
          {
            "label": "Locked source records",
            "path": "locks/artifacts.json"
          }
        ]
      },
      "render": {
        "file": "images/10724.webp",
        "caption": "Official RoboDojo layout 0, rendered at the authored transforms with the dual ARX X5 home configuration. The inset shows blocks 9, 18 and 15 before rollout.",
        "kind": "Source-layout rendering",
        "source": "RoboDojo-Benchmark/RoboDojo@35efbc7dedfdbeeb6e95fb749bd885d73d483e41; Assets/Eval_Layout/RoboDojo/arx_x5/0/stack_blocks_0.json"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "panda_grasp1000",
      "title": "Grasp1000",
      "robot": "Franka Panda",
      "group": "Panda",
      "profile": "Delivered Panda environment",
      "description": "Grasp an object from a fixed home pose, lift it 5 cm with contact on both fingers, and hold it clear of the table for nine control steps.",
      "actionDim": 7,
      "action": "Three hand translation commands, three rotation commands and a binary gripper command through the SysID controller.",
      "obsDim": 981,
      "obs": "Robot joints and hand state, object pose and twist, a 768-value object shape descriptor, surface queries, finger forces, table support, milestone history, and controller state.",
      "clock": "20 Hz control · 120 Hz physics · 6 substeps",
      "aliases": [],
      "schemaNote": "Uses the delivered fixed-home configuration and native admission retry.",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/panda_grasp1000/task.py"
        },
        {
          "label": "Grasp1000 delivery",
          "path": "doc/pipeline/active/state_rl/general_grasp/shared_grasp1000.md"
        }
      ],
      "expert": {
        "runnable": true,
        "name": "Fixed-home Grasp1000",
        "recipe": "FlashSAC with 3-step returns, a 0.99 discount, BPS object features and 20 Hz SysID control. The frozen policy averages actor parameters and batch-normalization statistics from rounds 15 and 20.",
        "trainer": "Franka1000 delivery team (jupiter2143).",
        "evaluation": {
          "taskId": "panda_grasp1000",
          "revision": "e465d482",
          "obsDim": 981,
          "actionDim": 7,
          "successes": 4,
          "attempts": 4,
          "protocol": "Frozen grasp actor on the native Panda setup, four starts, seed 42. See the full task library for checkpoints and evaluation receipts."
        },
        "sources": [
          {
            "label": "Evaluation receipts",
            "path": "./expert-evidence.json"
          },
          {
            "label": "Frozen-policy evaluator",
            "path": "src/axis_omnireset/training/grasp1000_evaluation.py"
          }
        ],
        "nativeBenchmark": "franka1000",
        "availability": "Evaluated on axis",
        "previousEvaluation": {
          "taskId": "panda_grasp1000",
          "revision": "4d8c53421496f5ce8bb49a97621bf1b99964eb9b",
          "obsDim": 981,
          "actionDim": 7,
          "successes": 4,
          "attempts": 4,
          "protocol": "Four episodes on the default four-slot population, one fresh start per slot, seed 42. Each episode ran to termination or timeout."
        }
      },
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The fixed-home grasp task samples object poses. Each of the 1,000 slots identifies an object instance. Frozen-policy evaluation episodes are a separate population.",
        "sources": [
          {
            "label": "Fixed-home Grasp1000 delivery",
            "path": "doc/pipeline/active/state_rl/general_grasp/franka1000.md"
          },
          {
            "label": "Grasp1000 embodiment contracts",
            "path": "doc/pipeline/active/state_rl/general_grasp/shared_grasp1000.md"
          }
        ]
      },
      "render": {
        "file": "images/panda_grasp1000.webp",
        "caption": "Measured Grasp1000 evaluation frame.",
        "kind": "Evaluation frame",
        "source": "reports/shared-i2rt/grasp1000-integration/panda.mp4"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "i2rt_inserting",
      "title": "Key insertion",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Pick up the key, guide it into the fixed slot, and turn it to the accepted orientation.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 110,
      "obs": "Joint positions and velocities for both arms (32), key pose (7), key linear and angular velocity (6), and slot pose (7). Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_inserting/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The shared task uses the RoboDojo key and slot. Its training and visualization records are separate from a task reference.",
        "sources": [
          {
            "label": "Reference reset and adaptation record",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_reference_resets.md"
          }
        ]
      },
      "render": {
        "file": "images/i2rt_inserting.webp",
        "caption": "Simulator reset viewed from across the table. From the arms, the key is on the left and the slot is on the right, 24 cm apart at the same reach depth.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "handover_butter",
      "title": "Butter handover",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Native setup",
      "description": "Grasp a stick of butter, pass it to the other hand and place it. The default skill ends at the donor’s first capture.",
      "actionDim": 14,
      "action": "Twelve bimanual TCP translation and rotation increments followed by the two gripper increments.",
      "obsDim": 209,
      "obs": "Bimanual joint and TCP state, butter pose and twist, target and relative poses, gripper contacts, action and stage history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "30 Hz control · 150 Hz physics · 5 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/handover_butter/task.py"
        }
      ],
      "expert": null,
      "refs": {
        "count": 1200,
        "summary": "Retained successful demonstrations",
        "length": "Native controls at 30 Hz: min 563, Q1 627, median 650, Q3 674, max 748.",
        "success": "100% (1,200/1,200) of the saved trajectories meet the source task’s label.",
        "notes": "The full chain spans pickup, handover and placement. The collector completed 1,622 physical attempts for 1,200 successful requests.",
        "sources": [
          {
            "label": "Five-task demonstration inventory",
            "path": "doc/pipeline/reference/state_rl/five_task_reproduction.md"
          },
          {
            "label": "Task dataset and recipe",
            "path": "doc/pipeline/active/state_rl/single_task/handover_butter_sac.md"
          }
        ],
        "quartiles": {
          "unit": "Control steps",
          "values": [
            563,
            627,
            650,
            674,
            748
          ]
        }
      },
      "render": {
        "file": "images/handover_butter.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/handover_butter-scene.jpg"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "panda_wood_stack_second",
      "title": "Stack the second block",
      "robot": "Franka FR3v2 (Panda)",
      "group": "Panda",
      "profile": "Native wood blocks",
      "description": "Place the held cube on a supported base. The tower must settle with at most 3 mm of center offset and at least 80% overlap.",
      "actionDim": 6,
      "action": "Six normalized Cartesian arm commands. The source STOP executor controls the gripper and exposes which rows can accept an arm action.",
      "obsDim": 122,
      "obs": "Original teacher state with both blocks, hand and joint state, task context, contacts and native controller history.",
      "clock": "Nominal 5 Hz decisions · 120 Hz physics · event-driven STOP intervals",
      "aliases": [
        "wood_stack_second"
      ],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/wood_blocks/panda.py"
        },
        {
          "label": "Wood-block task contract",
          "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 32,
        "summary": "Source teacher episodes",
        "length": "Decision intervals: min 37, Q1 64.25, median 77.5, Q3 91, max 107. Elapsed physics time: 8.13–22.1 s (median 16.17 s).",
        "success": "100% (32/32) in the selected source teacher file. Every final interval is valid, terminal, untruncated and carries the source success reward.",
        "notes": "27,561 restored initial states are packaged in the task library.",
        "sources": [
          {
            "label": "Wood-block reset and episode contracts",
            "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
          }
        ],
        "quartiles": {
          "unit": "Decision intervals",
          "values": [
            37,
            64.25,
            77.5,
            91,
            107
          ]
        }
      },
      "render": {
        "file": "images/panda_wood_stack_second.webp",
        "caption": "RTX rendering of a seeded simulator reset. The inset shows the working object in the same reset.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "franka1000",
      "title": "Grasp1000 training environment",
      "robot": "Franka Panda",
      "group": "Panda",
      "profile": "Native training entry",
      "description": "Grasp an object from a fixed home pose, lift it 5 cm with contact on both fingers, and hold it clear of the table for nine control steps.",
      "actionDim": 7,
      "action": "Three hand translation commands, three rotation commands and a binary gripper command through the SysID controller.",
      "obsDim": 981,
      "obs": "Robot joints and hand state, object pose and twist, a 768-value object shape descriptor, surface queries, finger forces, table support, milestone history, and controller state.",
      "clock": "20 Hz control · 120 Hz physics · 6 substeps",
      "aliases": [],
      "schemaNote": "981 is the released profile. The configurable training entry can append 77 queued-reference controller features.",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/franka1000/task.py"
        },
        {
          "label": "Grasp1000 delivery",
          "path": "doc/pipeline/active/state_rl/general_grasp/shared_grasp1000.md"
        }
      ],
      "expert": {
        "runnable": true,
        "availability": "Evaluated on axis",
        "name": "franka1000 frozen policy",
        "sources": [],
        "evaluation": {
          "taskId": "franka1000",
          "revision": "e465d482",
          "obsDim": 981,
          "actionDim": 7,
          "successes": 4,
          "attempts": 4,
          "protocol": "Deterministic delivered Panda actor, four fixed-home native slots, seed 42. See the full task library for checkpoints and evaluation receipts."
        }
      },
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The fixed-home grasp task samples object poses. Each of the 1,000 slots identifies an object instance. Frozen-policy evaluation episodes are a separate population.",
        "sources": [
          {
            "label": "Fixed-home Grasp1000 delivery",
            "path": "doc/pipeline/active/state_rl/general_grasp/franka1000.md"
          },
          {
            "label": "Grasp1000 embodiment contracts",
            "path": "doc/pipeline/active/state_rl/general_grasp/shared_grasp1000.md"
          }
        ]
      },
      "render": {
        "file": "images/franka1000.webp",
        "caption": "Measured Grasp1000 evaluation frame from the Panda wrapper of the native task.",
        "kind": "Evaluation frame",
        "source": "reports/shared-i2rt/grasp1000-integration/panda.mp4"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "panda_wood_pick",
      "title": "Wood block pick",
      "robot": "Franka FR3v2 (Panda)",
      "group": "Panda",
      "profile": "Native wood blocks",
      "description": "Acquire the designated 20 mm cube with both fingers and sustain 30 mm of bottom clearance for 0.30 seconds.",
      "actionDim": 6,
      "action": "Six normalized Cartesian arm commands. The source STOP executor controls the gripper and exposes which rows can accept an arm action.",
      "obsDim": 122,
      "obs": "Original teacher state with both blocks, hand and joint state, task context, contacts and native controller history.",
      "clock": "Nominal 5 Hz decisions · 120 Hz physics · event-driven STOP intervals",
      "aliases": [
        "wood_pick"
      ],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/wood_blocks/panda.py"
        },
        {
          "label": "Wood-block task contract",
          "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
        }
      ],
      "expert": {
        "runnable": true,
        "availability": "Evaluated on axis",
        "name": "panda_wood_pick frozen policy",
        "sources": [],
        "evaluation": {
          "taskId": "panda_wood_pick",
          "revision": "e465d482",
          "obsDim": 122,
          "actionDim": 6,
          "successes": 4,
          "attempts": 4,
          "protocol": "Four sampled native Panda course states, seed 42. Each admitted start ran to termination; action scheduling and STOP phases used the native wood binding. See the full task library for checkpoints and evaluation receipts."
        }
      },
      "refs": {
        "count": 64,
        "summary": "Source teacher episodes",
        "length": "Decision intervals: min 17, Q1 27, median 34.5, Q3 46, max 56. Elapsed physics time: 4.23–12.03 s (median 7.72 s).",
        "success": "100% (64/64) in the selected source teacher file. Every final interval is valid, terminal, untruncated and carries the source success reward.",
        "notes": "30,530 restored initial states are packaged in the task library.",
        "sources": [
          {
            "label": "Wood-block reset and episode contracts",
            "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
          }
        ],
        "quartiles": {
          "unit": "Decision intervals",
          "values": [
            17,
            27,
            34.5,
            46,
            56
          ]
        }
      },
      "render": {
        "file": "images/panda_wood_pick.webp",
        "caption": "RTX rendering of a seeded simulator reset. The inset shows the working object in the same reset.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "i2rt_wood_pick",
      "title": "Wood block pick",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Acquire the designated 20 mm cube with both fingers and sustain 30 mm of bottom clearance for 0.30 seconds.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 130,
      "obs": "Two 13-value block states, goal XYZ and active-block-to-goal vector, contact forces, grasp and release flags, stable time and episode progress. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/wood_blocks/i2rt.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        },
        {
          "label": "Task contract",
          "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "Reset-state bank only",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "30,530 source states are available for retargeted resets. The 64 native Panda teacher episodes use a different robot, observation and action contract and have no shared-I2RT trajectory conversion.",
        "sources": [
          {
            "label": "Wood-block reset and episode contracts",
            "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
          }
        ]
      },
      "render": {
        "file": "images/i2rt_wood_pick.webp",
        "caption": "RTX rendering of a seeded simulator reset. The inset shows the working object in the same reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "panda_wood_place_base",
      "title": "Place the base block",
      "robot": "Franka FR3v2 (Panda)",
      "group": "Panda",
      "profile": "Native wood blocks",
      "description": "Starting with a held cube, place it at the tower target, open the gripper and withdraw while the base stays stable.",
      "actionDim": 6,
      "action": "Six normalized Cartesian arm commands. The source STOP executor controls the gripper and exposes which rows can accept an arm action.",
      "obsDim": 122,
      "obs": "Original teacher state with both blocks, hand and joint state, task context, contacts and native controller history.",
      "clock": "Nominal 5 Hz decisions · 120 Hz physics · event-driven STOP intervals",
      "aliases": [
        "wood_place_base"
      ],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/wood_blocks/panda.py"
        },
        {
          "label": "Wood-block task contract",
          "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 64,
        "summary": "Source teacher episodes",
        "length": "Decision intervals: min 34, Q1 39.75, median 47, Q3 58.5, max 118. Elapsed physics time: 7.54–24.41 s (median 10.23 s).",
        "success": "100% (64/64) in the selected source teacher file. Every final interval is valid, terminal, untruncated and carries the source success reward.",
        "notes": "29,604 restored initial states are packaged in the task library.",
        "sources": [
          {
            "label": "Wood-block reset and episode contracts",
            "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
          }
        ],
        "quartiles": {
          "unit": "Decision intervals",
          "values": [
            34,
            39.75,
            47,
            58.5,
            118
          ]
        }
      },
      "render": {
        "file": "images/panda_wood_place_base.webp",
        "caption": "RTX rendering of a seeded simulator reset. The inset shows the working object in the same reset.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "i2rt_wood_place_base",
      "title": "Place the base block",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Starting with a held cube, place it at the tower target, open the gripper and withdraw while the base stays stable.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 130,
      "obs": "Two 13-value block states, goal XYZ and active-block-to-goal vector, contact forces, grasp and release flags, stable time and episode progress. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/wood_blocks/i2rt.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        },
        {
          "label": "Task contract",
          "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "Reset-state bank only",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "29,604 source states are available for retargeted resets. The 64 native Panda teacher episodes use a different robot, observation and action contract and have no shared-I2RT trajectory conversion.",
        "sources": [
          {
            "label": "Wood-block reset and episode contracts",
            "path": "doc/pipeline/active/state_rl/atomic_skills/wood_blocks.md"
          }
        ]
      },
      "render": {
        "file": "images/i2rt_wood_place_base.webp",
        "caption": "RTX rendering of a seeded simulator reset. The inset shows the working object in the same reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "5716",
      "title": "Apple to basket",
      "robot": "Franka Panda",
      "group": "Panda",
      "profile": "Native V48 placement",
      "description": "Move the apple into the upright basket and open the gripper once the apple contacts the basket.",
      "actionDim": 7,
      "action": "A measured-hand Cartesian increment (3 translation, 3 rotation) and a gripper command. The guarded gripper executes through the native controller. Translation scale 0.025 m; rotation scale 0.0833 rad.",
      "obsDim": 116,
      "obs": "Arm, finger and hand state, the four tracked scene objects, relative task geometry and the previous command.",
      "clock": "24 Hz control · 120 Hz physics · 5 substeps",
      "aliases": [
        "panda_task5716"
      ],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/task5716/task.py"
        }
      ],
      "expert": {
        "runnable": true,
        "availability": "Evaluated on axis",
        "name": "5716 frozen policy",
        "sources": [],
        "evaluation": {
          "taskId": "5716",
          "revision": "e465d482",
          "obsDim": 116,
          "actionDim": 7,
          "successes": 29,
          "attempts": 29,
          "protocol": "First complete episode on each initially admitted native curriculum slot, deterministic RSL-RL inference. See the full task library for checkpoints and evaluation receipts."
        }
      },
      "refs": {
        "count": 1202,
        "summary": "Source Franka recordings",
        "length": "Source controls at 5 Hz: min 12, Q1 32, median 38, Q3 47, max 403.",
        "success": "100% (1,202/1,202) carry the original goal-achieved label.",
        "notes": "Two Apple scenes, with 603 and 599 recordings. 51,602 archived states including one initial frame per recording. The percentages describe the supplied recordings.",
        "sources": [
          {
            "label": "V48 archive reproduction",
            "path": "doc/platform/reproducibility.md"
          },
          {
            "label": "Franka archive decoder",
            "path": "src/axis_omnireset/data/raw_franka_bank.py"
          }
        ],
        "quartiles": {
          "unit": "Control steps",
          "values": [
            12,
            32,
            38,
            47,
            403
          ]
        }
      },
      "render": {
        "file": "images/5716.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/task5716-scene.jpg"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "i2rt_task5716",
      "title": "Apple to basket",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Move the apple into the upright basket and open the gripper once the apple contacts the basket.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 174,
      "obs": "The 116 source-layout channels use a virtual Panda wrist representation, basket and object state, goal geometry and command history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_task5716/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 1202,
        "summary": "Retargeted source recordings",
        "length": "Source controls at 5 Hz: min 12, Q1 32, median 38, Q3 47, max 403.",
        "success": "100% (1,202/1,202) carry the original goal-achieved label. Shared-I2RT trajectory success has not been measured.",
        "notes": "Two Apple scenes, with 603 and 599 recordings. All 51,602 frames were mapped; 1,313 fell outside the IK tolerance and were retained in the unscreened reset bank. A pose replay does not score closed-loop task completion.",
        "sources": [
          {
            "label": "Reference reset and adaptation record",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_reference_resets.md"
          },
          {
            "label": "Franka archive decoder",
            "path": "src/axis_omnireset/data/raw_franka_bank.py"
          }
        ],
        "quartiles": {
          "unit": "Control steps",
          "values": [
            12,
            32,
            38,
            47,
            403
          ]
        }
      },
      "render": {
        "file": "images/i2rt_task5716.webp",
        "caption": "RTX rendering of a seeded simulator reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "i2rt_task5033",
      "title": "Chess-piece placement",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Lift the chess piece, move it into the goal region relative to the figurine, then release it onto a supporting surface.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 163,
      "obs": "The 105 source-layout channels use a virtual Panda wrist representation, measured prop state, goal geometry and command history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_task5033/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 302,
        "summary": "Retargeted source recordings",
        "length": "Source controls at 5 Hz: min 13, Q1 41, median 54, Q3 83, max 475.",
        "success": "100% (302/302) carry the original goal-achieved label. Shared-I2RT trajectory success has not been measured.",
        "notes": "One Chess scene. All 22,541 frames were mapped; 550 fell outside the IK tolerance and were retained in the unscreened reset bank. A pose replay does not score closed-loop task completion.",
        "sources": [
          {
            "label": "Reference reset and adaptation record",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_reference_resets.md"
          },
          {
            "label": "Franka archive decoder",
            "path": "src/axis_omnireset/data/raw_franka_bank.py"
          }
        ],
        "quartiles": {
          "unit": "Control steps",
          "values": [
            13,
            41,
            54,
            83,
            475
          ]
        }
      },
      "render": {
        "file": "images/i2rt_task5033.webp",
        "caption": "RTX rendering of a seeded simulator reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "i2rt_task10717",
      "title": "Press by number",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Read two digit cards, press the red and blue buttons in the required counts and order, then return both arms home.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 172,
      "obs": "Robot and button joint states, drive targets, TCP and button geometry, requested digits, press counts, phase and action history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_task10717/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "Buttons uses fresh starts. The digit combination and button poses describe the scene, and the reference-reset registry provides no recorded button trajectory.",
        "sources": [
          {
            "label": "Reference reset and adaptation record",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_reference_resets.md"
          }
        ]
      },
      "render": {
        "file": "images/i2rt_task10717.webp",
        "caption": "Simulator reset viewed from across the table. The red, red and blue buttons form a row across the arms. Each digit card sits 12 cm farther from the arms than its red button.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "inserting",
      "title": "Key insertion",
      "robot": "Dual ARX X5",
      "group": "ARX X5",
      "profile": "ARX tabletop",
      "description": "Pick up the key, guide it into the fixed slot, and turn it to the accepted orientation.",
      "actionDim": 14,
      "action": "Left then right TCP translation (3), rotation vector (3) and absolute gripper (1). Normalized increments scale to 0.01 m and 0.04 rad per world axis. Fully open is 0.044 m per finger.",
      "obsDim": 52,
      "obs": "Joint positions and velocities for both arms (32), key pose (7), key linear and angular velocity (6), and slot pose (7).",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/inserting/task.py"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The key and slot use a deterministic reset. The integration recording documents a control test; the package ships no insertion demonstration.",
        "sources": [
          {
            "label": "Key insertion contract and recording",
            "path": "src/axis_omnireset/tasks/inserting/README.md"
          }
        ]
      },
      "render": {
        "file": "images/inserting.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/inserting-scene.jpg"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "i2rt_watch_basket_place",
      "title": "Watch into basket",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Native setup",
      "description": "Carry a wristwatch over the basket, release it inside and withdraw the gripper while the watch stays supported.",
      "actionDim": 8,
      "action": "Absolute environment-local executing-arm TCP position (3), WXYZ quaternion (4), and gripper opening [0, 1]. The other arm holds its start target. The hybrid controller owns descent, release and retreat.",
      "obsDim": 1205,
      "obs": "Robot state and targets, object and basket poses, task roles, contact and release history, and sampled geometry from both objects. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "25 Hz control · 250 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_watch_basket_place/task.py"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The six portable watch cases contain 20,153 sampled starts. The native contract restores independent state snapshots and requalifies them in physics.",
        "sources": [
          {
            "label": "Watch-basket migration",
            "path": "doc/pipeline/active/state_rl/atomic_skills/i2rt_watch_basket_migration.md"
          },
          {
            "label": "Native watch environment",
            "path": "src/axis_omnireset/tasks/i2rt_watch_basket_place/README.md"
          }
        ]
      },
      "render": {
        "file": "images/i2rt_watch_basket_place.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/i2rt_watch_basket_place-scene.jpg"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "i2rt_watch_place",
      "title": "Five-object tray Place",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Either arm starts holding one of five objects. Carry it to a requested point in the tray and release it. The default target is the center of the tray floor.",
      "actionDim": 14,
      "action": "14 normalized values, seven per arm. The policy supplies six world-frame TCP increments for the executing arm, up to 0.01 m of translation and 0.04 rad of rotation per axis. The passive arm holds its reset pose. The release controller opens the gripper when the footprint, height and clearance checks pass.",
      "obsDim": 256,
      "obs": "189 task values cover both arms and their drive targets, six rigid bodies, TCP poses, the selected object and arm, geometry, contacts and release history. Another 58 values describe the measured state of both arms. The final nine values give the target XYZ in scene axes, the TCP-to-target vector in TCP axes, and the target offset from the center and bottom of the object’s footprint in scene axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "At reset, the target can be offset up to ±25 mm along the tray and ±8 mm across it. Success requires physical containment after release. The task reports XY distance to the requested point separately.",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "https://github.com/MurphyZhao04/axis-omnireset/blob/d9ebd2af7426446d997608a75139cb13122d0f54/src/axis_omnireset/tasks/i2rt_watch_place/task.py"
        },
        {
          "label": "Task and reset contract",
          "path": "https://github.com/MurphyZhao04/axis-omnireset/blob/d9ebd2af7426446d997608a75139cb13122d0f54/src/axis_omnireset/tasks/i2rt_watch_place/README.md"
        }
      ],
      "expert": {
        "runnable": true,
        "name": "The bundled containment policy handles center targets. For off-center targets, supply a goal-conditioned checkpoint that reads all 256 values. A success rate for the goal-conditioned task has yet to be reported.",
        "trainer": "Chenan’s I2RT Place team.",
        "recipe": "The bundled center policy used behavior cloning on successful episodes, followed by FlashSAC training with a frozen PointNet on intermediate states and held starts.",
        "sources": [
          {
            "label": "Shared and native Place evaluation receipts",
            "path": "./expert-evidence.json"
          }
        ],
        "nativeBenchmark": "i2rt_multi_place_cascade",
        "availability": "Center policy bundled",
        "previousEvaluation": {
          "taskId": "i2rt_watch_place",
          "revision": "1de0b6147b8e830d4b647d9f946e4d76b59484c2",
          "obsDim": 247,
          "actionDim": 14,
          "successes": 9,
          "attempts": 10,
          "protocol": "Ten held-out TEST starts selected with seed 42, one per object and arm. All ten passed shared-physics reset qualification. Deterministic episodes ran to termination or the 32 s limit. The right-arm candy episode ended on a physical validity check."
        }
      },
      "refs": {
        "count": 0,
        "summary": "51,000 held reset snapshots",
        "length": "One physical endpoint per row.",
        "success": "Episodes are scored during rollout.",
        "notes": "50,000 R2 training rows, 500 DEV rows and 500 TEST rows. All five objects and both executing arms occur in each split. The runtime package uses these banks.",
        "sources": []
      },
      "render": {
        "file": "images/i2rt_watch_place.webp",
        "caption": "Seed 42 held reset on the shared tabletop. The executing gripper holds the candy container above the rectangular tray.",
        "kind": "Simulator reset",
        "source": "RTX render from the measured shared Isaac scene on axis, R2 seed 42, slot 0."
      },
      "taskRevision": "d9ebd2af7426446d997608a75139cb13122d0f54"
    },
    {
      "id": "pick10",
      "title": "Pick10",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Native setup",
      "description": "Grasp the designated object and hold its bottom at least 5 cm above the basket rim for nine control steps.",
      "actionDim": 7,
      "action": "Left TCP translation and rotation-vector increments (6) plus an incremental gripper-opening command.",
      "obsDim": 1033,
      "obs": "Proprioception, object and TCP state, target grasp, object shape descriptor, scene-distance probes, contacts and grasp history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "30 Hz control · 150 Hz physics · 5 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/pick10/task.py"
        }
      ],
      "expert": {
        "runnable": true,
        "availability": "Evaluated on axis",
        "name": "pick10 frozen policy",
        "sources": [],
        "evaluation": {
          "taskId": "pick10",
          "revision": "e465d482",
          "obsDim": 1033,
          "actionDim": 7,
          "successes": 16,
          "attempts": 16,
          "protocol": "Deterministic frozen actor on 16 native first-frame bank starts, seed 42, at 30 Hz. See the full task library for checkpoints and evaluation receipts."
        }
      },
      "refs": {
        "count": 10000,
        "summary": "Retained successful demonstrations",
        "length": "Native controls at 30 Hz: min 135, Q1 194, median 220, Q3 251, max 300.",
        "success": "100% (10,000/10,000) of the saved trajectories meet the source task’s label.",
        "notes": "Each of 2,500 training starts contributes four demonstrations; both the first-success index and terminal frame are stored.",
        "sources": [
          {
            "label": "Five-task demonstration inventory",
            "path": "doc/pipeline/reference/state_rl/five_task_reproduction.md"
          },
          {
            "label": "Task dataset and recipe",
            "path": "doc/pipeline/active/state_rl/single_task/pick10.md"
          }
        ],
        "quartiles": {
          "unit": "Control steps",
          "values": [
            135,
            194,
            220,
            251,
            300
          ]
        }
      },
      "render": {
        "file": "images/pick10.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/pick10-scene.jpg"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "i2rt_pick10",
      "title": "Pick10",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Grasp the designated object and hold its bottom at least 5 cm above the basket rim for nine control steps.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 1033,
      "obs": "Proprioception, object and TCP state, target grasp, object shape descriptor, scene-distance probes, contacts and grasp history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_pick10/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": {
        "runnable": true,
        "name": "Pick10 SA-v3.1",
        "recipe": "SA-v3.1 SAC with first-frame and intermediate demonstration resets. The frozen actor reads the original task features and its commands are converted to the shared controller.",
        "trainer": "Native I2RT state-RL team (jupiter2143).",
        "evaluation": {
          "taskId": "i2rt_pick10",
          "revision": "e465d482",
          "obsDim": 1033,
          "actionDim": 14,
          "successes": 0,
          "attempts": 16,
          "protocol": "Frozen author policy on 16 fresh shared-tabletop starts, seed 42. Each episode ran to success, failure or timeout. See the full task library for checkpoints and evaluation receipts."
        },
        "sources": [
          {
            "label": "Evaluation receipts",
            "path": "./expert-evidence.json"
          },
          {
            "label": "Frozen-policy evaluator",
            "path": "src/axis_omnireset/training/shared_frozen_experts.py"
          }
        ],
        "nativeBenchmark": "pick10",
        "availability": "Evaluated on axis",
        "previousEvaluation": {
          "taskId": "i2rt_pick10",
          "revision": "4d8c53421496f5ce8bb49a97621bf1b99964eb9b",
          "obsDim": 1033,
          "actionDim": 14,
          "successes": 0,
          "attempts": 16,
          "protocol": "Sixteen parallel episodes with the same default scene configuration, fresh resets and deterministic actions, seed 42. All replicas used cube_2."
        }
      },
      "refs": {
        "count": 10,
        "summary": "Shared reference-bank recordings",
        "length": "Stored pose frames including the initial frame: min 173, Q1 202.75, median 221, Q3 235.5, max 264.",
        "success": "Source selection: 10/10 successful. Shared-I2RT trajectory completion is unscored.",
        "notes": "One recording per object, drawn from 10,000 native Pick10 demonstrations.",
        "sources": [
          {
            "label": "Reference reset and adaptation record",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_reference_resets.md"
          },
          {
            "label": "Native reference-bank importer",
            "path": "src/axis_omnireset/data/raw_native_bank.py"
          },
          {
            "label": "Five-task demonstration inventory",
            "path": "doc/pipeline/reference/state_rl/five_task_reproduction.md"
          }
        ],
        "quartiles": {
          "unit": "Stored pose frames",
          "values": [
            173,
            202.75,
            221,
            235.5,
            264
          ]
        }
      },
      "render": {
        "file": "images/i2rt_pick10.webp",
        "caption": "RTX rendering of a seeded simulator reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "pick100",
      "title": "Pick100",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Native setup",
      "description": "Grasp and lift tabletop objects from randomized ungrasped starts within a sequence of milestone deadlines.",
      "actionDim": 7,
      "action": "Left TCP translation and rotation-vector increments (6) plus an incremental gripper-opening command.",
      "obsDim": 1034,
      "obs": "Default tabletop policy features include joint and object state, TCP and target geometry, a shape descriptor, probes, contacts, and milestone history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "30 Hz control · 150 Hz physics · 5 substeps",
      "aliases": [],
      "schemaNote": "The default dual-arm recipe uses 976 task features. Explicit single-arm free-grasp recipes have their own encoder and append 29 robot values.",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/pick100/task.py"
        }
      ],
      "expert": {
        "runnable": true,
        "availability": "Evaluated on axis",
        "name": "pick100 frozen policy",
        "sources": [],
        "evaluation": {
          "taskId": "pick100",
          "revision": "e465d482",
          "obsDim": 1034,
          "actionDim": 7,
          "successes": 247,
          "attempts": 512,
          "protocol": "Deterministic author checkpoint on 512 native reset-bank slots, seed 42, original policy observation prefix. See the full task library for checkpoints and evaluation receipts."
        }
      },
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "Free-grasp SAC trains online from randomized starts without action demonstrations. The object catalog and initial-state bank count different things.",
        "sources": [
          {
            "label": "Native Pick100 recipe",
            "path": "doc/pipeline/active/state_rl/single_task/pick100.md"
          }
        ]
      },
      "render": {
        "file": "images/pick100.webp",
        "caption": "Saved native Pick100 nominal start 0, action_camera_0. Both arms and target use the source joint and object poses; the overview and inset show the same pre-jitter state. Collision meshes are shaded for visibility.",
        "kind": "Source-bank rendering",
        "source": "Prepared Pick100 initial-state bank, state 0"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "push10",
      "title": "Push10",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Native setup",
      "description": "Use an open gripper to push the designated object to its goal position without picking it up.",
      "actionDim": 6,
      "action": "Left TCP translation and rotation-vector increments (6). The gripper stays open.",
      "obsDim": 1023,
      "obs": "Robot and object state, target displacement, object shape, workspace probes, contact evidence and recent actions. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "30 Hz control · 150 Hz physics · 5 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/push10/task.py"
        }
      ],
      "expert": {
        "runnable": true,
        "availability": "Evaluated on axis",
        "name": "push10 frozen policy",
        "sources": [],
        "evaluation": {
          "taskId": "push10",
          "revision": "e465d482",
          "obsDim": 1023,
          "actionDim": 6,
          "successes": 0,
          "attempts": 16,
          "protocol": "Deterministic frozen actor on 16 native first-frame bank starts, seed 42, at 30 Hz. See the full task library for checkpoints and evaluation receipts."
        }
      },
      "refs": {
        "count": 10000,
        "summary": "Retained successful demonstrations",
        "length": "Native controls at 30 Hz: min 114, Q1 209, median 258, Q3 296, max 400.",
        "success": "100% (10,000/10,000) of the saved trajectories meet the source task’s label.",
        "notes": "The collection retained 10,000 unique successes in 1,855,286 attempts (0.539% unique acceptance).",
        "sources": [
          {
            "label": "Five-task demonstration inventory",
            "path": "doc/pipeline/reference/state_rl/five_task_reproduction.md"
          },
          {
            "label": "Task dataset and recipe",
            "path": "doc/pipeline/active/state_rl/single_task/push10.md"
          }
        ],
        "quartiles": {
          "unit": "Control steps",
          "values": [
            114,
            209,
            258,
            296,
            400
          ]
        }
      },
      "render": {
        "file": "images/push10.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/push10-scene.jpg"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "i2rt_push10",
      "title": "Push10",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Use an open gripper to push the designated object to its goal position without picking it up.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 1023,
      "obs": "Robot and object state, target displacement, object shape, workspace probes, contact evidence and recent actions. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_push10/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": {
        "runnable": true,
        "name": "Push10 SA-v3.1",
        "recipe": "SA-v3.1 SAC with demonstration-stage and first-frame resets. The frozen actor reads the original task features and its commands are converted to the shared controller.",
        "trainer": "Native I2RT state-RL team (jupiter2143).",
        "evaluation": {
          "taskId": "i2rt_push10",
          "revision": "e465d482",
          "obsDim": 1023,
          "actionDim": 14,
          "successes": 0,
          "attempts": 16,
          "protocol": "Frozen author policy on 16 fresh shared-tabletop starts, seed 42. Each episode ran to success, failure or timeout. See the full task library for checkpoints and evaluation receipts."
        },
        "sources": [
          {
            "label": "Evaluation receipts",
            "path": "./expert-evidence.json"
          },
          {
            "label": "Frozen-policy evaluator",
            "path": "src/axis_omnireset/training/shared_frozen_experts.py"
          }
        ],
        "nativeBenchmark": "push10",
        "availability": "Evaluated on axis",
        "previousEvaluation": {
          "taskId": "i2rt_push10",
          "revision": "4d8c53421496f5ce8bb49a97621bf1b99964eb9b",
          "obsDim": 1023,
          "actionDim": 14,
          "successes": 0,
          "attempts": 16,
          "protocol": "Sixteen parallel episodes with the same default scene configuration, fresh resets and deterministic actions, seed 42. All replicas used cube_2."
        }
      },
      "refs": {
        "count": 10,
        "summary": "Shared reference-bank recordings",
        "length": "Stored pose frames including the initial frame: min 115, Q1 152, median 177, Q3 194.5, max 254.",
        "success": "Source selection: 10/10 successful. Shared-I2RT trajectory completion is unscored.",
        "notes": "One recording per object, drawn from 10,000 native Push10 demonstrations.",
        "sources": [
          {
            "label": "Reference reset and adaptation record",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_reference_resets.md"
          },
          {
            "label": "Native reference-bank importer",
            "path": "src/axis_omnireset/data/raw_native_bank.py"
          },
          {
            "label": "Five-task demonstration inventory",
            "path": "doc/pipeline/reference/state_rl/five_task_reproduction.md"
          }
        ],
        "quartiles": {
          "unit": "Stored pose frames",
          "values": [
            115,
            152,
            177,
            194.5,
            254
          ]
        }
      },
      "render": {
        "file": "images/i2rt_push10.webp",
        "caption": "RTX rendering of a seeded simulator reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "track10",
      "title": "Track10",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Native setup",
      "description": "Grasp and lift an object, carry it past obstacles, then release it on its support at the target pose.",
      "actionDim": 7,
      "action": "Left TCP translation and rotation-vector increments (6) plus an incremental gripper-opening command.",
      "obsDim": 1097,
      "obs": "Robot and object state, goal pose, object and obstacle surface features, clearance probes, contacts, and transport history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "30 Hz control · 150 Hz physics · 5 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/track10/task.py"
        }
      ],
      "expert": {
        "runnable": true,
        "availability": "Evaluated on axis",
        "name": "track10 frozen policy",
        "sources": [],
        "evaluation": {
          "taskId": "track10",
          "revision": "e465d482",
          "obsDim": 1097,
          "actionDim": 7,
          "successes": 0,
          "attempts": 16,
          "protocol": "Deterministic frozen actor on 16 native first-frame bank starts, seed 42, at 30 Hz. See the full task library for checkpoints and evaluation receipts."
        }
      },
      "refs": {
        "count": 10000,
        "summary": "Retained successful demonstrations",
        "length": "Native controls at 30 Hz: min 326, Q1 459, median 499, Q3 535, max 600.",
        "success": "100% (10,000/10,000) of the saved trajectories meet the source task’s label.",
        "notes": "The success frame and object identity are stored for each trajectory.",
        "sources": [
          {
            "label": "Five-task demonstration inventory",
            "path": "doc/pipeline/reference/state_rl/five_task_reproduction.md"
          },
          {
            "label": "Task dataset and recipe",
            "path": "doc/pipeline/active/state_rl/single_task/track10.md"
          }
        ],
        "quartiles": {
          "unit": "Control steps",
          "values": [
            326,
            459,
            499,
            535,
            600
          ]
        }
      },
      "render": {
        "file": "images/track10.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/track10-scene.jpg"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "i2rt_track10",
      "title": "Track10",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Grasp and lift an object, carry it past obstacles, then release it on its support at the target pose.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 1097,
      "obs": "Robot and object state, goal pose, object and obstacle surface features, clearance probes, contacts, and transport history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_track10/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": {
        "runnable": true,
        "name": "Track10 SA-v3.1",
        "recipe": "SA-v3.1 SAC with intermediate demonstration states. The frozen actor reads the original task features and its commands are converted to the shared controller.",
        "trainer": "Native I2RT state-RL team (jupiter2143).",
        "evaluation": {
          "taskId": "i2rt_track10",
          "revision": "e465d482",
          "obsDim": 1097,
          "actionDim": 14,
          "successes": 0,
          "attempts": 16,
          "protocol": "Frozen author policy on 16 fresh shared-tabletop starts, seed 42. Each episode ran to success, failure or timeout. See the full task library for checkpoints and evaluation receipts."
        },
        "sources": [
          {
            "label": "Evaluation receipts",
            "path": "./expert-evidence.json"
          },
          {
            "label": "Frozen-policy evaluator",
            "path": "src/axis_omnireset/training/shared_frozen_experts.py"
          }
        ],
        "nativeBenchmark": "track10",
        "availability": "Evaluated on axis",
        "previousEvaluation": {
          "taskId": "i2rt_track10",
          "revision": "4d8c53421496f5ce8bb49a97621bf1b99964eb9b",
          "obsDim": 1097,
          "actionDim": 14,
          "successes": 0,
          "attempts": 16,
          "protocol": "Sixteen parallel episodes with the same default scene configuration, fresh resets and deterministic actions, seed 42. All replicas used cube_2."
        }
      },
      "refs": {
        "count": 10,
        "summary": "Shared reference-bank recordings",
        "length": "Stored pose frames including the initial frame: min 447, Q1 486, median 509, Q3 526.25, max 541.",
        "success": "Source selection: 10/10 successful. Shared-I2RT trajectory completion is unscored.",
        "notes": "One recording per object, drawn from 10,000 native Track10 demonstrations.",
        "sources": [
          {
            "label": "Reference reset and adaptation record",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_reference_resets.md"
          },
          {
            "label": "Native reference-bank importer",
            "path": "src/axis_omnireset/data/raw_native_bank.py"
          },
          {
            "label": "Five-task demonstration inventory",
            "path": "doc/pipeline/reference/state_rl/five_task_reproduction.md"
          }
        ],
        "quartiles": {
          "unit": "Stored pose frames",
          "values": [
            447,
            486,
            509,
            526.25,
            541
          ]
        }
      },
      "render": {
        "file": "images/i2rt_track10.webp",
        "caption": "RTX rendering of a seeded simulator reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "i2rt_handover_butter",
      "title": "Butter handover",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Grasp a stick of butter, pass it to the other hand and place it. The default skill ends at the donor’s first capture.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 209,
      "obs": "Bimanual joint and TCP state, butter pose and twist, target and relative poses, gripper contacts, action and stage history. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_handover_butter/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": {
        "runnable": true,
        "name": "Butter milestone policies",
        "recipe": "Demonstration-conditioned FlashSAC with separate grasp, handover and placement policies. The evaluator selects the policy for the current milestone.",
        "trainer": "Native I2RT state-RL team (jupiter2143).",
        "evaluation": {
          "taskId": "i2rt_handover_butter",
          "revision": "e465d482",
          "obsDim": 209,
          "actionDim": 14,
          "successes": 0,
          "attempts": 16,
          "protocol": "Frozen author policy on 16 fresh shared-tabletop starts, seed 42. Each episode ran to success, failure or timeout. See the full task library for checkpoints and evaluation receipts."
        },
        "sources": [
          {
            "label": "Evaluation receipts",
            "path": "./expert-evidence.json"
          },
          {
            "label": "Frozen-policy evaluator",
            "path": "src/axis_omnireset/training/shared_frozen_experts.py"
          }
        ],
        "nativeBenchmark": "handover_butter",
        "availability": "Evaluated on axis",
        "previousEvaluation": {
          "taskId": "i2rt_handover_butter",
          "revision": "4d8c53421496f5ce8bb49a97621bf1b99964eb9b",
          "obsDim": 209,
          "actionDim": 14,
          "successes": 0,
          "attempts": 16,
          "protocol": "Sixteen parallel episodes with the same default scene configuration, fresh resets and deterministic actions, seed 42. The default checker ends at the donor’s first capture (milestone 0)."
        }
      },
      "refs": {
        "count": 1,
        "summary": "One recording, two course views",
        "length": "197 stored pose frames for the default first-capture course; 697 for the full chain. Both derive from native row 0.",
        "success": "The source recording is a successful native handover (1/1). Shared-I2RT trajectory completion is unscored.",
        "notes": "The two imported courses reuse one source episode from the 1,200-trajectory native corpus.",
        "sources": [
          {
            "label": "Reference reset and adaptation record",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_reference_resets.md"
          },
          {
            "label": "Native reference-bank importer",
            "path": "src/axis_omnireset/data/raw_native_bank.py"
          },
          {
            "label": "Five-task demonstration inventory",
            "path": "doc/pipeline/reference/state_rl/five_task_reproduction.md"
          }
        ]
      },
      "render": {
        "file": "images/i2rt_handover_butter.webp",
        "caption": "RTX rendering of a seeded simulator reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "blind_assembly",
      "title": "Blind assembly",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Native setup",
      "description": "Align and seat the held peg in the matching fixture using proprioception. The insertion checker measures capture and stable seating.",
      "actionDim": 6,
      "action": "Six rate-limited left arm joint increments, anchored to the drive target. The source prefix controller has a separate action interface.",
      "obsDim": 616,
      "obs": "An 18-frame window of 31 proprioceptive values per frame (558). A separate privileged critic can inspect assembly state. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "30 Hz control · 150 Hz physics · 5 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/blind_assembly/task.py"
        }
      ],
      "expert": {
        "runnable": true,
        "availability": "Evaluated on axis",
        "name": "blind_assembly frozen policy",
        "sources": [],
        "evaluation": {
          "taskId": "blind_assembly",
          "revision": "e465d482",
          "obsDim": 616,
          "actionDim": 6,
          "successes": 15,
          "attempts": 32,
          "protocol": "Deterministic insertion PPO on 32 qualified native insertion-state resets, seed 42, at 30 Hz. See the full task library for checkpoints and evaluation receipts."
        }
      },
      "refs": {
        "count": 24000,
        "summary": "Retained successful demonstrations",
        "length": "Native controls at 30 Hz: min 290, Q1 419, median 453, Q3 504, max 770.",
        "success": "100% (24,000/24,000) of the saved trajectories meet the source task’s label.",
        "notes": "The 15 trajectory shards contain 24 variants and explicit success flags. The collection accepted 24,000 out of 43,008 attempted rows (55.8%).",
        "sources": [
          {
            "label": "Five-task demonstration inventory",
            "path": "doc/pipeline/reference/state_rl/five_task_reproduction.md"
          },
          {
            "label": "Task dataset and recipe",
            "path": "doc/pipeline/active/state_rl/i2rt_blind_assembly.md"
          }
        ],
        "quartiles": {
          "unit": "Control steps",
          "values": [
            290,
            419,
            453,
            504,
            770
          ]
        }
      },
      "render": {
        "file": "images/blind_assembly.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/blind_assembly-scene.jpg"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "i2rt_blind_assembly",
      "title": "Blind assembly",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Align and seat the held peg in the matching fixture using proprioception. The insertion checker measures capture and stable seating.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 616,
      "obs": "An 18-frame window of 31 proprioceptive values per frame (558). A separate privileged critic can inspect assembly state. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_blind_assembly/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": {
        "runnable": true,
        "name": "SAC grasp and PPO insertion",
        "recipe": "A frozen SAC grasp policy precedes a proprioceptive PPO insertion policy. The round-1320 PPO used 32,768 environments and 32-step rollouts.",
        "trainer": "Native I2RT state-RL team (jupiter2143).",
        "evaluation": {
          "taskId": "i2rt_blind_assembly",
          "revision": "e465d482",
          "obsDim": 616,
          "actionDim": 14,
          "successes": 0,
          "attempts": 16,
          "protocol": "Frozen author policy on 16 fresh shared-tabletop starts, seed 42. Each episode ran to success, failure or timeout. See the full task library for checkpoints and evaluation receipts."
        },
        "sources": [
          {
            "label": "Evaluation receipts",
            "path": "./expert-evidence.json"
          },
          {
            "label": "Frozen-policy evaluator",
            "path": "src/axis_omnireset/training/shared_frozen_experts.py"
          }
        ],
        "nativeBenchmark": "blind_assembly",
        "availability": "Evaluated on axis",
        "previousEvaluation": {
          "taskId": "i2rt_blind_assembly",
          "revision": "4d8c53421496f5ce8bb49a97621bf1b99964eb9b",
          "obsDim": 616,
          "actionDim": 14,
          "successes": 0,
          "attempts": 16,
          "protocol": "Sixteen parallel episodes with the same default scene configuration, fresh resets and deterministic actions, seed 42. All replicas used peg variant 00. None reached the handoff to the insertion policy."
        }
      },
      "refs": {
        "count": 24,
        "summary": "Shared reference-bank recordings",
        "length": "Stored pose frames including the initial frame: min 346, Q1 403, median 427, Q3 507.25, max 606.",
        "success": "Source selection: 24/24 successful. Shared-I2RT trajectory completion is unscored.",
        "notes": "One successful left-arm training recording per assembly variant, drawn from 24,000 source demonstrations. Across the 10,749 mapped frames, 6,001 exceeded the IK tolerance; the unscreened import retains them.",
        "sources": [
          {
            "label": "Reference reset and adaptation record",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_reference_resets.md"
          },
          {
            "label": "Native reference-bank importer",
            "path": "src/axis_omnireset/data/raw_native_bank.py"
          },
          {
            "label": "Five-task demonstration inventory",
            "path": "doc/pipeline/reference/state_rl/five_task_reproduction.md"
          }
        ],
        "quartiles": {
          "unit": "Stored pose frames",
          "values": [
            346,
            403,
            427,
            507.25,
            606
          ]
        }
      },
      "render": {
        "file": "images/i2rt_blind_assembly.webp",
        "caption": "RTX rendering of a seeded simulator reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "dual_arx_x5",
      "title": "Dual-arm base",
      "robot": "Dual ARX X5",
      "group": "ARX X5",
      "profile": "ARX tabletop",
      "description": "Move two ARX X5 arms and their grippers over an empty desk. This base scene has no task objective.",
      "actionDim": 14,
      "action": "Left then right TCP translation (3), rotation vector (3) and absolute gripper (1). Normalized increments scale to 0.01 m and 0.04 rad per world axis. Fully open is 0.044 m per finger.",
      "obsDim": 32,
      "obs": "Left joint positions and velocities, then right joint positions and velocities. Each arm has six revolute joints and two finger joints.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/dual_arx_x5/task.py"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "Empty robot-and-desk task. The bounded motion check exercises the controls.",
        "sources": [
          {
            "label": "Base task contract",
            "path": "src/axis_omnireset/tasks/dual_arx_x5/README.md"
          }
        ]
      },
      "render": {
        "file": "images/dual_arx_x5.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/dual_arx_x5-scene.jpg"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "i2rt_base",
      "title": "Dual-arm base",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Exercise both arms and grippers on the shared desk. This base scene has no task objective.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 90,
      "obs": "The original 32 channels contain per-arm joint positions and velocities. Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_base/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "Empty shared tabletop and authored robot home pose.",
        "sources": [
          {
            "label": "Shared platform contract",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
          }
        ]
      },
      "render": {
        "file": "images/i2rt_base.webp",
        "caption": "RTX rendering of a seeded simulator reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "example",
      "title": "Point-mass reach",
      "robot": "Planar point mass",
      "group": "Point mass",
      "profile": "Teaching simulator",
      "description": "Accelerate a point mass in the plane until it reaches the target within 5 cm.",
      "actionDim": 2,
      "action": "Two normalized planar acceleration components in [−1, 1].",
      "obsDim": 6,
      "obs": "Planar position (2), velocity (2), and displacement to the goal (2).",
      "clock": "20 Hz integration",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/example/task.py"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The point-mass teaching environment generates initial positions and goals.",
        "sources": [
          {
            "label": "Example task",
            "path": "src/axis_omnireset/tasks/example/README.md"
          }
        ]
      },
      "render": {
        "file": "images/example.webp",
        "caption": "Task scene rendered by the native Viser adapter.",
        "kind": "Viser snapshot",
        "source": "environment-snapshots/example-scene.jpg"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "i2rt_example",
      "title": "TCP reach",
      "robot": "Dual I2RT",
      "group": "I2RT",
      "profile": "Shared tabletop",
      "description": "Move the left tool to within 5 cm of a target placed 10 cm forward from its reset position.",
      "actionDim": 14,
      "action": "Per arm: three TCP translation increments, three rotation-vector increments and one absolute gripper command. Left arm first, then right. The normalized range is [−1, 1], with 0.01 m and 0.04 rad per axis. Grippers map from closed to 0.0475 m.",
      "obsDim": 64,
      "obs": "Planar left TCP position, velocity and displacement to the goal (6). Both physical arms add 58 measured values in this order: 16 joint positions, 16 joint velocities, 6 TCP positions, 6 TCP linear velocities, 8 TCP orientations (WXYZ), and 6 TCP angular velocities. Each field is left then right. Positions are environment-local, and twists use world axes.",
      "clock": "15 Hz control · 150 Hz physics · 10 substeps",
      "aliases": [],
      "schemaNote": "",
      "sources": [
        {
          "label": "Environment implementation",
          "path": "src/axis_omnireset/tasks/i2rt_example/task.py"
        },
        {
          "label": "Shared robot observation layout",
          "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_tabletop.md"
        }
      ],
      "expert": null,
      "refs": {
        "count": 0,
        "summary": "No reference recordings bundled",
        "length": "No recorded episodes.",
        "success": "No recorded episodes to score.",
        "notes": "The reach target is generated at reset.",
        "sources": [
          {
            "label": "Reference reset and adaptation record",
            "path": "doc/pipeline/active/state_rl/atomic_skills/shared_i2rt_reference_resets.md"
          }
        ]
      },
      "render": {
        "file": "images/i2rt_example.webp",
        "caption": "RTX rendering of a seeded simulator reset. The physically authored I2RT link primitives are displayed in slate.",
        "kind": "Simulator reset",
        "source": "Reset-only Isaac capture on axis, seed 42, env 0"
      },
      "taskRevision": "9130fe15f5eafaec55d88d327678c9e6b0a67087"
    },
    {
      "id": "i2rt_pick5000",
      "title": "Left-arm Pick5000",
      "group": "I2RT",
      "robot": "I2RT left arm",
      "profile": "Fixed I1",
      "description": "Establish bilateral finger contact, lift the object 5 cm clear of its support, and hold the final condition for 14 control steps.",
      "actionDim": 7,
      "obsDim": 957,
      "action": "Three Cartesian translation commands, three rotation commands and one incremental gripper command.",
      "obs": "Ordered state and object geometry features used by the frozen policy.",
      "clock": "30 Hz control · 150 Hz physics · 5 substeps",
      "aliases": [],
      "sources": [],
      "schemaNote": "",
      "expert": {
        "runnable": true,
        "name": "Fixed-I1 Pick5000",
        "sources": [],
        "availability": "Evaluated on axis",
        "evaluation": {
          "taskId": "i2rt_pick5000",
          "revision": "e465d482",
          "obsDim": 957,
          "actionDim": 7,
          "successes": 15,
          "attempts": 16,
          "protocol": "Deterministic mean policy from fixed I1 home, 30 Hz control over five 150 Hz physics steps, four qualified objects with four replicas each, seed 42. See the full task library for checkpoints and evaluation receipts."
        },
        "recipe": "The original fixed-I1 delivery recorded 29,398 successes in 30,000 episodes (97.9933%)."
      },
      "refs": {
        "count": 48,
        "summary": "16 teacher rollouts and 32 source-controller validation trajectories.",
        "sources": []
      },
      "render": {
        "file": "images/rendering/i2rt-pick5000.jpg",
        "kind": "scene",
        "alt": "I2RT left-arm Pick5000 rollout on axis",
        "caption": "A frame from the fixed-I1 expert rollout. The Rendering page includes the full episode."
      },
      "taskRevision": "e465d482"
    },
    {
      "id": "franka_push5000",
      "title": "Franka Push5000",
      "group": "Panda",
      "robot": "Franka Panda",
      "profile": "Native Panda",
      "description": "Make contact for two controls, pass the progress milestones, and leave the object supported within 20 mm of the goal at ≤20 mm/s XY speed for four controls.",
      "actionDim": 6,
      "obsDim": 984,
      "action": "Six Cartesian tool increments with the gripper open.",
      "obs": "Ordered state and object geometry features used by the frozen policy.",
      "clock": "20 Hz control · 120 Hz physics · 6 substeps",
      "aliases": [],
      "sources": [],
      "schemaNote": "",
      "expert": {
        "runnable": true,
        "name": "Push5000 frozen policy",
        "sources": [],
        "availability": "Evaluated on axis",
        "evaluation": {
          "taskId": "franka_push5000",
          "revision": "e465d482",
          "obsDim": 984,
          "actionDim": 6,
          "successes": 2,
          "attempts": 4,
          "protocol": "Four-object fixed-checkpoint transfer on the registered Push5000 task, seed 42. This small prepared population is a separate evaluation from the original frozen run. See the full task library for checkpoints and evaluation receipts."
        }
      },
      "refs": {
        "count": null,
        "summary": "See the server inventory.",
        "sources": []
      },
      "render": {
        "file": "images/franka_push5000.png",
        "kind": "training curve",
        "alt": "Franka Push5000 training curve",
        "caption": "Training progress recorded by the task authors. The axis results use separate frozen evaluations."
      },
      "taskRevision": "e465d482"
    }
  ],
  "nativeBenchmarks": {
    "pick10": {
      "successes": 97,
      "attempts": 100,
      "protocol": "Ten demonstration-first-frame starts per object/layout, sampled from the training bank with seed 42.",
      "source": {
        "label": "Native pick10 evaluation receipt",
        "path": "doc/assets/original_author_experts_20261108/original-expert-comparison.json"
      }
    },
    "push10": {
      "successes": 0,
      "attempts": 100,
      "protocol": "Ten demonstration-first-frame starts per object/layout, sampled from the training bank with seed 42. This probe used the registered native controller with a bank from an earlier physics revision.",
      "source": {
        "label": "Native push10 evaluation receipt",
        "path": "doc/assets/original_author_experts_20261108/original-expert-comparison.json"
      }
    },
    "track10": {
      "successes": 0,
      "attempts": 100,
      "protocol": "Ten demonstration-first-frame starts per object/layout, sampled from the training bank with seed 42.",
      "source": {
        "label": "Native track10 evaluation receipt",
        "path": "doc/assets/original_author_experts_20261108/original-expert-comparison.json"
      }
    },
    "handover_butter": {
      "successes": 285,
      "attempts": 300,
      "protocol": "Full three-policy handover chain on 250 training and 50 validation starts.",
      "source": {
        "label": "Native handover_butter evaluation receipt",
        "path": "doc/assets/original_author_experts_20261108/original-expert-comparison.json"
      }
    },
    "blind_assembly": {
      "successes": 6093,
      "attempts": 7200,
      "protocol": "SAC approach followed by PPO insertion in continuous physics, 300 starts for each of 24 geometries across training and validation.",
      "source": {
        "label": "Native blind_assembly evaluation receipt",
        "path": "doc/assets/original_author_experts_20261108/original-expert-comparison.json"
      }
    },
    "i2rt_multi_place_cascade": {
      "successes": 482,
      "attempts": 500,
      "protocol": "Five-object tray Place at 25 Hz. The frozen actor ran on 500 held-out TEST starts, 50 per object and arm. The denominator includes one rejected reset.",
      "source": {
        "label": "Native five-object Place evaluation receipt",
        "path": "./expert-evidence.json"
      }
    },
    "franka1000": {
      "successes": 89807,
      "attempts": 90000,
      "protocol": "Frozen Panda actor, three independent fixed-home evaluations of 30,000 starts each across 1,000 object slots.",
      "source": {
        "label": "Native Panda fixed-home evaluation",
        "path": "doc/pipeline/active/state_rl/general_grasp/franka1000.md"
      }
    }
  }
};
