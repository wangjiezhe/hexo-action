// Thanks to @Aetf
const pathFn = require('path');
const fs = require('fs');
const parseConfig = require('hexo-deployer-git/lib/parse_config');
const spawn = require('hexo-util/lib/spawn');
const Hexo = require('hexo');

async function sync_deploy_history() {
  // Get logger
  const log = this.log;
  log.info('\nSync start...');

  // Hexo context
  const hexo = new Hexo(process.cwd(), { silent: true });
  await hexo.init();

  const deployDir = pathFn.join(hexo.base_dir, '.deploy_git');

  // For git cmd
  function git(...args) {
    return spawn('git', args, {
      cwd: deployDir,
      verbose: true,
      stdio: 'inherit'
    });
  }

  // Get multi deployer configurations as array
  let deployConfigs = hexo.config.deploy;
  if (!Array.isArray(deployConfigs)) {
    deployConfigs = [deployConfigs];
  }

  // Parse repo from configs and pull repo
  deployConfigs.forEach(deployConfig => {
    if (deployConfig.type !== 'git') {
      log.info(`Skip deployer: ${deployConfig.type}.`);
      return;
    }
    const repos = parseConfig(deployConfig);
    if (repos.length > 1) {
      log.error(`Given too much repos: ${repos.length}.`);
      throw new TypeError('Only single repo is supported!');
    }
    console.log(`Located a single repo: ${repos[0].url},${repos[0].branch}.`);
    result = git('clone', '--branch', repos[0].branch, repos[0].url, deployDir);
    log.info(result);
  });

  log.info('Sync done\n');
}

sync_deploy_history();