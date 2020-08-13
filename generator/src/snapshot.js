const fs = require('fs').promises;
const path = require('path');
const { yellow, red } = require('kleur');

async function saveSnapshot(options, file) {
  if (typeof file !== 'string') {
    file = 'snapshot.json';
  }
  await fs.writeFile(file, JSON.stringify(options, null, 2), 'utf8');
  console.log(yellow((`Captured snapshot: ${file}`)));
}

async function restoreSnapshot(file) {
  if (file) {
    try {
      const snapshot = require(path.resolve(file));
      return snapshot;
    } catch(err) {
      console.log(red(`Could not load "${file}"`));
      process.exit(1);
    }
  } else {
    return {};
  }
}

module.exports = {
  saveSnapshot,
  restoreSnapshot,
};