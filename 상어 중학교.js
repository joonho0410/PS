const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, M] = input.shift().split(' ').map(Number);
const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

let map = [];
for (let i = 0; i < N; ++i) map.push(input[i].split(' ').map(Number));

solve();

function solve() {
  let ans = 0;
  while (1) {
    const groups = groupingBlock(map);
    let target = null;

    groups.sort((a, b) => {
      if (a[2] !== b[2]) return b[2] - a[2];
      if (a[3] !== b[3]) return b[3] - a[3];
      if (a[0] !== b[0]) return b[0] - a[0];
      return b[1] - a[1];
    });
    for (let i = 0; i < groups.length; ++i) {
      const [r, c, cnt, rainbow] = groups[i];
      if (cnt <= 1) continue;
      target = groups[i];
      break;
    }
    if (!target) break;
    const [r, c, cnt, rainbow] = target;
    ans += cnt * cnt;
    deleteBlock(map, r, c);
    gravity(map);
    map = rotate(map);
    gravity(map);
  }
  console.log(ans);
}

function deleteBlock(map, r, c) {
  const visit = Array.from({ length: N }, () => Array(N).fill(false));

  dfs(r, c, map[r][c]);

  function dfs(r, c, color) {
    visit[r][c] = true;
    map[r][c] = null;

    for (let i = 0; i < 4; ++i) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
      if (visit[nr][nc]) continue;
      if (map[nr][nc] === 0 || map[nr][nc] === color) dfs(nr, nc, color);
    }
  }
}

function groupingBlock(map) {
  const groups = []; // [r, c, cnt, rainbow]
  const finished = Array.from({ length: N }, () => Array(N).fill(false));

  for (let r = 0; r < N; ++r) {
    for (let c = 0; c < N; ++c) {
      if (
        map[r][c] === null ||
        map[r][c] === -1 ||
        map[r][c] === 0 ||
        finished[r][c]
      )
        continue;
      groups.push([r, c, ...findGroup(r, c)]);
    }
  }

  function findGroup(r, c) {
    const visit = Array.from({ length: N }, () => Array(N).fill(false));
    let rainbow = 0;

    return [dfs(r, c, map[r][c]), rainbow];

    function dfs(r, c, color) {
      visit[r][c] = true;
      finished[r][c] = true;
      let cnt = 1;

      for (let i = 0; i < 4; ++i) {
        const nr = r + dr[i];
        const nc = c + dc[i];
        if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
        if (visit[nr][nc]) continue;
        if (map[nr][nc] === 0 || map[nr][nc] === color) {
          if (map[nr][nc] === 0) ++rainbow;
          cnt += dfs(nr, nc, color);
        }
      }

      return cnt;
    }
  }

  return groups;
}

function gravity(map) {
  for (let c = 0; c < N; ++c) {
    for (let r = N - 1; r >= 0; --r) {
      if (map[r][c] === null || map[r][c] === -1) continue;
      let cr = r;

      while (1) {
        if (cr + 1 >= N || map[cr + 1][c] !== null || map[cr + 1][c] === -1)
          break;
        [map[cr][c], map[cr + 1][c]] = [map[cr + 1][c], map[cr][c]];
        ++cr;
      }
    }
  }
}

function rotate(map) {
  const rotateMap = Array.from({ length: N }, () => Array(N).fill(0));

  for (let r = 0; r < N; ++r) {
    for (let c = 0; c < N; ++c) {
      rotateMap[N - c - 1][r] = map[r][c];
    }
  }

  return rotateMap;
}

function printMap(map) {
  for (let r = 0; r < N; ++r)
    console.log(map[r].map((e) => (e === null ? 'ㅁ' : e)).join(' '));
  console.log('-------------------');
}
