/* The atlas reads its packaged records directly so the same page works over HTTP and file URLs. */
(() => {
  'use strict';
  const { tasks: registry, revision, nativeBenchmarks = {} } = window.AXIS_ATLAS;
  const tasks = registry.filter(task => task.profile !== 'Native setup');
  const hiddenNativeIds = new Set(registry.filter(task => task.profile === 'Native setup').map(task => task.id));
  const byId = new Map(tasks.flatMap(task => [task.id, ...task.aliases].map(id => [id, task])));
  const gallery = document.querySelector('#cards');
  const query = document.querySelector('#query');
  const total = document.querySelector('#total');
  const robots = document.querySelector('#robots');
  const resultsStatus = document.querySelector('#results-status');
  const panel = document.createElement('section');
  panel.className = 'panel';
  panel.id = 'task-detail';
  panel.setAttribute('aria-labelledby', 'detail-heading');
  let group = 'All robots';
  let visible = tasks.slice();
  let selected = null;
  let layout = 'grid';
  let previousColumns = 0;

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function metric(label, value) {
    const cell = el('span', 'metric');
    cell.append(el('span','metric-label',label), el('span','metric-value',value));
    return cell;
  }

  function setAddress(value, record=false) {
    const hash = value ? '#' + value : '';
    if (location.hash !== hash) {
      if (record) history.pushState(null, '', hash || '#top');
      else history.replaceState(null, '', hash || '#top');
    }
  }

  function formatCount(count) {
    return Number.isInteger(count) ? count.toLocaleString('en-US') : 'Unreported';
  }

  function hasScore(result) {
    return result && Number.isInteger(result.attempts) && result.attempts > 0 &&
      Number.isInteger(result.successes) && result.successes >= 0 && result.successes <= result.attempts;
  }

  function targetEvaluation(task) {
    const expert = task.expert;
    const result = expert?.evaluation;
    if (!expert?.runnable || !hasScore(result) || result.taskId !== task.id ||
        result.revision !== (task.taskRevision || revision) || result.obsDim !== task.obsDim || result.actionDim !== task.actionDim) return null;
    return result;
  }

  function successRate(result) {
    return (result.successes / result.attempts).toLocaleString('en-US', {
      style: 'percent', maximumFractionDigits: 2
    }) + ' (' + result.successes + '/' + result.attempts + ')';
  }

  function card(task, index) {
    const article = el('article','task-card');
    article.dataset.robot = task.group;
    article.dataset.id = task.id;
    const button = el('button','card-button');
    button.type = 'button';
    button.id = 'open-' + task.id;
    button.setAttribute('aria-expanded', 'false');
    const photo = el('span', 'photo');
    const img = el('img');
    img.src = task.render.file;
    img.alt = task.render.alt || (task.title + ' environment with ' + task.robot);
    img.loading = index < 3 ? 'eager' : 'lazy';
    img.decoding = 'async';
    const robotLabel = task.group === 'I2RT' ? task.robot + ' · ' + task.profile : task.robot;
    photo.append(img, el('span', 'robot-label', robotLabel));
    const copy = el('span', 'card-copy');
    const heading = el('span','card-title-line');
    const title = el('span','card-title',task.title);
    const symbol = el('span','expand-symbol','+');
    symbol.setAttribute('aria-hidden','true');
    heading.append(title, symbol);
    copy.append(heading, el('code','env-id',task.id), el('span','card-desc',task.description));
    const stats = el('span','metrics');
    stats.append(metric('Expert',task.expert?.runnable ? (task.expert.availability || 'Available') : 'None verified'));
    const result = targetEvaluation(task);
    if (task.profile === 'Shared tabletop' && result) stats.append(metric('Shared success',successRate(result)));
    stats.append(metric('Trajectories',formatCount(task.refs.count)));
    button.append(photo, copy, stats);
    button.addEventListener('click', () => {
      if (selected === task) closePanel(false);
      else showPanel(task, true, true);
    });
    article.append(button);
    return article;
  }

  function section(title, badge) {
    const box = el('section','data-group');
    const heading = el('h4',null,title);
    if (badge) heading.append(el('span','dimension',badge));
    box.append(heading);
    return box;
  }

  function facts(rows) {
    const list = el('dl');
    for (const [term, definition] of rows) {
      if (definition) list.append(el('dt',null,term), el('dd',null,definition));
    }
    return list;
  }

  function lengthPlot(stats) {
    const [min, first, median, third, max] = stats.values;
    const position = value => 100 * (value - min) / (max - min);
    const figure = el('figure','length-plot');
    const caption = el('figcaption',null,stats.unit + ' per trajectory');
    caption.append(el('strong',null,'Median ' + median));
    const track = el('div','range-track');
    track.setAttribute('aria-hidden','true');
    const quartiles = el('span','quartiles');
    quartiles.style.left = position(first) + '%';
    quartiles.style.width = position(third) - position(first) + '%';
    const midpoint = el('span','range-median');
    midpoint.style.left = position(median) + '%';
    track.append(quartiles,midpoint);
    const legend = el('div','range-legend');
    for (const [index,label] of [[0,'Min'],[4,'Max']]) {
      const item = el('span',null,label);
      item.append(el('strong',null,String(stats.values[index])));
      legend.append(item);
    }
    figure.append(caption,track,legend);
    return figure;
  }

  function sourceItem(label, path) {
    if (!path.startsWith('./')) {
      const reference = el('span', null, label);
      reference.title = path;
      return reference;
    }
    const link = el('a', null, label);
    link.href = path;
    return link;
  }

  function buildPanel(task) {
    const head = el('div','panel-head');
    const name = el('div');
    const heading = el('h3',null,task.title);
    heading.id = 'detail-heading';
    heading.tabIndex = -1;
    name.append(heading,el('p',null,[task.robot, task.profile, task.id, ...task.aliases.map(id => 'alias ' + id)].join('  /  ')));
    const close = el('button','dismiss','Close ×');
    close.type = 'button';
    close.addEventListener('click', () => closePanel(true));
    head.append(name,close);
    const body = el('div','panel-content');
    const act = section('Action space',task.actionDim + 'D');
    act.append(el('p',null,task.action), el('p',null,task.clock));
    const obs = section('Observation space',task.obsDim.toLocaleString('en-US') + 'D');
    obs.append(el('p',null,task.obs));
    if (task.schemaNote) obs.append(el('p',null,task.schemaNote));
    body.append(act,obs);
    const expert = task.expert?.runnable ? task.expert : null;
    const result = targetEvaluation(task);
    const previous = expert?.previousEvaluation;
    const hasPrevious = hasScore(previous) && previous.taskId === task.id && previous.revision !== task.taskRevision;
    const benchmark = (result || hasPrevious) && nativeBenchmarks[expert.nativeBenchmark];
    const showNative = hasScore(benchmark);
    if (expert) {
      const ex = section('Trained expert');
      ex.append(facts([['Policy',expert.name],[task.profile === 'Shared tabletop' ? 'Shared success' : 'Success on this setup',result && successRate(result)],
        ['Evaluation',result?.protocol],
        ['Earlier shared evaluation',hasPrevious && successRate(previous) + ' on the ' + previous.obsDim + '-value task. ' + previous.protocol],
        ['Native success',showNative && successRate(benchmark)],
        ['Native evaluation',showNative && benchmark.protocol],['Recipe',expert.recipe],['Trained by',expert.trainer]]));
      body.append(ex);
    }
    const refs = section('Reference trajectories');
    refs.append(facts([['Count',formatCount(task.refs.count)],['Collection',task.refs.summary],
      ['Length distribution',task.refs.length],['Trajectory success',task.refs.success],['Scope',task.refs.notes]]));
    if (task.refs.quartiles) refs.append(lengthPlot(task.refs.quartiles));
    if (!expert) refs.classList.add('wide');
    body.append(refs);
    const bottom = el('div','panel-foot');
    const sources = el('div','panel-sources');
    sources.append(el('span','detail-kicker','Sources'));
    const seen = new Set();
    for (const source of [...task.sources, ...(expert?.sources || []), ...(showNative ? [benchmark.source] : []), ...task.refs.sources]) {
      if (!source.path || seen.has(source.path)) continue;
      seen.add(source.path);
      sources.append(sourceItem(source.label,source.path));
    }
    const full = sourceItem('Open scene image','./' + task.render.file);
    sources.append(full);
    bottom.append(sources);
    if (task.render.caption) bottom.append(el('p','panel-note',task.render.caption));
    panel.replaceChildren(head, body, bottom);
  }

  function columns() {
    return Number(getComputedStyle(gallery).getPropertyValue('--columns').trim()) || 1;
  }

  function placePanel() {
    if (!selected) return;
    const cards = [...gallery.querySelectorAll('.task-card')];
    const index = visible.indexOf(selected);
    if (index < 0) return;
    const n = columns();
    const end = Math.min(cards.length-1, Math.floor(index/n)*n+n-1);
    cards[end].after(panel);
    previousColumns = n;
  }

  function closePanel(focus, updateHash=true) {
    if (!selected) return;
    const button = document.getElementById('open-' + selected.id);
    panel.remove();
    if (button) {
      button.setAttribute('aria-expanded','false');
      button.removeAttribute('aria-controls');
      button.querySelector('.expand-symbol').textContent = '+';
      if (focus) {button.focus({preventScroll:true});button.scrollIntoView({block:'nearest'});}
    }
    selected = null;
    if (updateHash) setAddress('library');
  }

  function showPanel(task, scroll, record=false) {
    closePanel(false, false);
    selected = task;
    const button = document.getElementById('open-' + task.id);
    button.setAttribute('aria-expanded','true');
    button.setAttribute('aria-controls','task-detail');
    button.querySelector('.expand-symbol').textContent = '−';
    buildPanel(task);
    placePanel();
    setAddress('task/' + task.id, record);
    if (scroll) {
      panel.querySelector('h3').focus({preventScroll:true});
      window.scrollTo({top: window.scrollY + panel.getBoundingClientRect().top - Math.min(92, innerHeight * .12), behavior:'instant'});
    }
  }

  function render() {
    closePanel(false, false);
    const tokens = query.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    visible = tasks.filter(task => {
      const words = [task.title,task.id,...task.aliases,task.robot,task.group,task.profile,task.description].join(' ').toLowerCase();
      return (group === 'All robots' || group === task.group) && tokens.every(token => words.includes(token));
    });
    gallery.replaceChildren(...visible.map(card));
    document.querySelector('#empty').hidden = visible.length !== 0;
    total.textContent = visible.length;
    resultsStatus.textContent = visible.length + ' of ' + tasks.length + ' environments';
    for (const button of robots.children) button.setAttribute('aria-pressed',String(button.dataset.group === group));
  }

  function filter(next, input, hash='library') {
    group = next;
    query.value = input;
    render();
    setAddress(hash);
  }

  for (const robot of ['All robots','I2RT','Panda','ARX X5','Point mass']) {
    const button = el('button',null,robot);
    button.dataset.group = robot;
    button.type = 'button';
    button.addEventListener('click',() => filter(robot,query.value));
    robots.append(button);
  }
  query.addEventListener('input', () => { render(); setAddress('library'); });
  document.querySelector('#clear-filters').addEventListener('click', () => {filter('All robots','');query.focus();});

  function changeLayout(next) {
    layout = next;
    gallery.classList.toggle('list-view',layout === 'list');
    for (const key of ['grid','list']) document.querySelector('#'+key+'-button').setAttribute('aria-pressed',String(layout===key));
    placePanel();
  }
  document.querySelector('#list-button').addEventListener('click',() => changeLayout('list'));
  document.querySelector('#grid-button').addEventListener('click',() => changeLayout('grid'));
  function compare() {
    filter('All robots','wood_stack_second','compare-wood');
    document.querySelector('#library').scrollIntoView({block:'start'});
  }
  document.querySelector('#compare').addEventListener('click',event => {event.preventDefault();compare();});
  document.querySelector('#hero-panda').src = byId.get('panda_wood_stack_second').render.file;
  document.querySelector('#hero-i2rt').src = byId.get('i2rt_wood_stack_second').render.file;
  document.addEventListener('keydown',event => {
    if (event.key==='Escape' && selected) closePanel(true);
  });
  window.addEventListener('resize', () => { if (selected && columns()!==previousColumns) placePanel(); });
  function followHash() {
    if (location.hash==='#compare-wood') { compare();return; }
    const match = /^#task\/([a-z0-9_]+)$/.exec(location.hash);
    const id = match?.[1];
    let task = byId.get(id);
    if (hiddenNativeIds.has(id)) {
      task = tasks.find(entry => entry.expert?.nativeBenchmark === id);
      if (!task) {
        filter('All robots','');
        document.querySelector('#library').scrollIntoView({block:'start'});
        return;
      }
    }
    if (task) {
      if (!visible.includes(task)) {group='All robots';query.value='';render();}
      showPanel(task,true);
    } else closePanel(false,false);
  }
  window.addEventListener('hashchange',followHash);
  render();
  followHash();
})();
