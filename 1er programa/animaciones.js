const fx = document.getElementById('fx');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let activeDrops = 0;
    const MAX_DROPS = 140;
    const RAIN_INTERVAL = 180;

    function spawnRain() {
      if (activeDrops >= MAX_DROPS) return;
      const el = document.createElement('span');
      el.className = 'raindrop';
      el.style.left = (Math.random() * window.innerWidth) + 'px';
      const size = 12 + Math.random() * 8;
      const dur = 4.5 + Math.random() * 2.8;
      const drift = (Math.random() < .5 ? -1 : 1) * (8 + Math.random() * 24);
      el.style.fontSize = size + 'px';
      el.style.setProperty('--dur', dur + 's');
      el.style.setProperty('--drift', drift + 'px');
      activeDrops++;
      fx.appendChild(el);
      setTimeout(() => { el.remove(); activeDrops = Math.max(0, activeDrops - 1); }, dur * 1000 + 120);
    }
    if (!reduce) setInterval(spawnRain, RAIN_INTERVAL);

    const grid = document.getElementById('grid');
    function buildHeart() {
      const COLS = 29, ROWS = 23, DOT = 14;
      grid.style.gridTemplateColumns = `repeat(${COLS}, ${DOT}px)`;
      grid.classList.add('show');
      const XMIN = -1.8, XMAX = 1.8, YMIN = -1.7, YMAX = 1.7;
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          const x = XMIN + (i + .5) * (XMAX - XMIN) / COLS;
          const y = YMAX - (j + .5) * (YMAX - YMIN) / ROWS;
          const f = Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y;
          const cell = document.createElement('span');
          if (f <= 0) {
            cell.className = 'dot'; grid.appendChild(cell);
            setTimeout(() => cell.classList.add('reveal'), 38 * (i + j));
          } else {
            cell.style.width = cell.style.height = DOT + 'px';
            grid.appendChild(cell);
          }
        }
      }
      setTimeout(drawBouquetOptimized, 2500);
    }
    setTimeout(buildHeart, 4000);

    function spawnHeartAtClient(x, y) {
      if (activeDrops >= MAX_DROPS) return;
      const el = document.createElement('span');
      el.className = 'raindrop clickdrop';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      const size = 14 + Math.random() * 8;
      const dur = 3.4 + Math.random() * 2.0;
      const drift = (Math.random() < .5 ? -1 : 1) * (10 + Math.random() * 28);
      const dist = (window.innerHeight - y) + 40;
      el.style.fontSize = size + 'px';
      el.style.setProperty('--dur', dur + 's');
      el.style.setProperty('--drift', drift + 'px');
      el.style.setProperty('--dy', dist + 'px');
      activeDrops++;
      fx.appendChild(el);
      setTimeout(() => { el.remove(); activeDrops = Math.max(0, activeDrops - 1); }, dur * 1000 + 150);
    }
    document.addEventListener('pointerdown', e => spawnHeartAtClient(e.clientX, e.clientY));

    function drawBouquetOptimized() {
      const holder = document.getElementById('bouquet');
      const w = 360, h = 180, svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`); svg.setAttribute('width', w); svg.setAttribute('height', h);

      const stems = document.createElementNS(svgNS, 'path');
      stems.setAttribute('d', 'M170,160 C180,130 200,110 210,90 M170,160 C160,130 140,115 125,95 M170,160 C175,130 220,120 235,105');
      stems.setAttribute('fill', 'none'); stems.setAttribute('stroke', 'var(--stem)'); stems.setAttribute('stroke-width', '6'); stems.setAttribute('class', 'stroke-draw');
      svg.appendChild(stems);

      const leaf = (x, y, r, rot = 0) => {
        const p = document.createElementNS(svgNS, 'path');
        p.setAttribute('d', `M ${x} ${y} c ${-r} ${-r / 3}, ${-r} ${r / 3}, 0 ${r} c ${r} ${-r / 3}, ${r} ${r / 3}, 0 ${-r} z`);
        p.setAttribute('fill', 'var(--leaf)'); p.setAttribute('opacity', '.9');
        p.setAttribute('transform', `rotate(${rot} ${x} ${y})`);
        p.setAttribute('class', 'stroke-draw'); p.setAttribute('stroke', '#1f5f45'); p.setAttribute('stroke-width', '2');
        svg.appendChild(p);
      };
      leaf(145, 125, 26, -25); leaf(200, 125, 28, 30);

      const clusters = [{ cx: 130, cy: 95, radius: 40, count: 48 }, { cx: 170, cy: 80, radius: 44, count: 60 }, { cx: 215, cy: 95, radius: 40, count: 48 }];
      const makePetal = (gx, gy) => {
        const g = document.createElementNS(svgNS, 'g'); g.setAttribute('class', 'petal');
        const base = `hsl(${340 + Math.random() * 10},85%,${60 + Math.random() * 10}%)`;
        const r = 3.4 + Math.random() * 0.9;
        const add = (dx, dy) => {
          const c = document.createElementNS(svgNS, 'circle');
          c.setAttribute('cx', gx + dx); c.setAttribute('cy', gy + dy); c.setAttribute('r', r); c.setAttribute('fill', base); g.appendChild(c);
        };
        add(0, -r); add(r, 0); add(0, r); add(-r, 0);
        const center = document.createElementNS(svgNS, 'circle');
        center.setAttribute('cx', gx); center.setAttribute('cy', gy); center.setAttribute('r', 1.4); center.setAttribute('fill', '#ffd6e3');
        g.appendChild(center);
        return g;
      };

      const items = [];
      clusters.forEach(cl => {
        for (let i = 0; i < cl.count; i++) {
          const a = Math.PI * 2 * Math.random();
          const rr = Math.sqrt(Math.random()) * cl.radius;
          items.push({ x: cl.cx + Math.cos(a) * rr, y: cl.cy + Math.sin(a) * rr });
        }
      });

      let idx = 0;
      function step() {
        const frag = document.createDocumentFragment();
        for (let k = 0; k < 12 && idx < items.length; k++, idx++) {
          const { x, y } = items[idx];
          const pet = makePetal(x, y);
          pet.style.animationDelay = (idx * 8) + 'ms';
          frag.appendChild(pet);
        }
        svg.appendChild(frag);
        if (idx < items.length) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);

      holder.appendChild(svg);
    }