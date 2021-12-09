const path = require('path');
const fs = require('fs');
const util = require('util');

const PRJ_DIR = path.join(__dirname, "../");
const PRJ_NAME = path.basename(PRJ_DIR);
const DIST_DIR = path.join(PRJ_DIR, "dist/" + PRJ_NAME);
if (fs.existsSync(DIST_DIR)) {
  const PATH_IN = path.join(DIST_DIR, "ngsw.json");
  if (fs.existsSync(PATH_IN)) {
    const json = JSON.parse(fs.readFileSync(PATH_IN));
    json.assetGroups.forEach(value => {
      if (value && value['urls']) {
        let result = [];
        value['urls'].forEach((name) => {
          if (name[0] === '.') {
            const PATH_SEARCH = path.join(DIST_DIR, name);
            if (!fs.existsSync(PATH_SEARCH)) {
              delete json.hashTable[name];
            } else {
              result.push(name);
            }
          } else {
            result.push(name);
          }
        });
        value['urls'] = result;
      }
    });
    fs.writeFileSync(PATH_IN, JSON.stringify(json, null, 2));
  }
}
