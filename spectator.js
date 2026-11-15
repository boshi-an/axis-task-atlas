/* Packaged reset frames verified on axis. Keep the source view available in each card. */
(() => {
  const recorded = new Set([
  "10717",
  "10724",
  "5033",
  "5716",
  "blind_assembly",
  "dual_arx_x5",
  "example",
  "franka1000",
  "franka_push5000",
  "handover_butter",
  "i2rt_base",
  "i2rt_blind_assembly",
  "i2rt_example",
  "i2rt_grasp1000",
  "i2rt_handover_butter",
  "i2rt_inserting",
  "i2rt_jf_pick",
  "i2rt_jf_place",
  "i2rt_pick10",
  "i2rt_pick5000",
  "i2rt_push10",
  "i2rt_task10717",
  "i2rt_task5033",
  "i2rt_task5716",
  "i2rt_track10",
  "i2rt_watch_basket_place",
  "i2rt_watch_place",
  "i2rt_wood_pick",
  "i2rt_wood_place_base",
  "i2rt_wood_stack_second",
  "inserting",
  "panda_grasp1000",
  "panda_wood_pick",
  "panda_wood_place_base",
  "panda_wood_stack_second",
  "pick10",
  "pick100",
  "push10",
  "track10"
]);
  for (const task of window.AXIS_ATLAS.tasks) {
    if (!recorded.has(task.id)) continue;
    const original = task.render;
    task.sources.push({label: original.kind + ' · source view', path: './' + original.file});
    task.render = {
      kind: 'Simulator reset',
      file: 'images/spectator/' + task.id + '.jpg',
      caption: 'Environment 0 at reset on axis, shown with the shared spectator camera for this robot.',
      source: 'Verified state recording from the registered task'
    };
  }
})();
