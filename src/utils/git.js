import util from 'node:util';
import path from 'node:path';
import childProcess from 'node:child_process';

export async function getGitRepoRoot() {
  const { stdout } = await git('rev-parse --show-toplevel');
  return stdout.trim();
}

export async function getGitRelativePath(absolutePath) {
  const root = await getGitRepoRoot();
  return path.relative(root, absolutePath);
}

export async function getGitAbsolutePath(relativePath) {
  const root = await getGitRepoRoot();
  return path.resolve(root, relativePath);
}

export async function getGitLastUpdated(path, branch = 'main') {
  path = await getGitAbsolutePath(path);
  const { stdout } = await git(
    `log -1 --pretty="format:%cs" --date=short -- ${branch} ${path}`
  );
  return stdout.trim();
}

export async function getGitFirstTag(path) {
  path = await getGitAbsolutePath(path);
  const commit = await getGitFirstCommit(path);
  const { stdout } = await git(`describe --contains ${commit}`);
  return stdout.trim().replace(/~.*$/, '');
}

export async function getGitFirstCommit(path) {
  path = await getGitAbsolutePath(path);
  const { stdout } = await git(
    `log --reverse --diff-filter=A --pretty=format:"%h" -- ${path}`
  );
  return stdout.split('\n')[0].trim();
}

export async function git(subcommand) {
  const exec = util.promisify(childProcess.exec);
  return await exec(`git ${subcommand}`);
}
