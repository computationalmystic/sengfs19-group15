export default {
  repoRelations: (state: any) => {
    let repoRelations:any = {}, repos = state.cache.getRepos || [], repoGroups = state.cache.getRepoGroups || []
    repoGroups.forEach((group: any) => {
      // Move down between future relation endpoint
      repoRelations[group.rg_name] = {};
      repos.filter((repo: any) => {
        return repo.gitURL === group.rg_name;
      }).forEach((repo: any) => {
        repoRelations[group.rg_name][repo.url] = repo
      });
    });
    return repoRelations;
  },
  repoGroups: (state:any) => {
    return state.cache.getRepoGroups;
  },
  repos: (state: any) => {
    return state.cache.getRepos
  },
  apiGroups: (state: any) => {
    return state.apiGroups;
  },
  apiRepos: (state: any) => {
    return state.apiRepos;
  },
  // groupsList: (state: any) => {
  //   return Object.keys(state.cache.groupsInfo);
  // },
  AugurAPI: (state: any) => {
    return state.AugurAPI;
  },
  repo: (state: any) => {
      return state.baseRepo;
  },
  gitRepo: (state: any) => {
      return state.gitRepo;
  },
  repo_groups: (state: any) => {
    return state.cache.getRepoGroups
  },
  sorted_repos: (state:any)=> (col: string, ascending: boolean) => {
      if (state.cache.getRepos == undefined) {
          return []
      }
      const items = [...state.cache.getRepos].sort((a,b) => {
      if (a[col] > b[col]) {
        return ascending ? 1 : -1
      } else if (a[col] < b[col]) {
        return ascending ? -1 : 1
      }
      return 0;
    })
    return items
  },
  sorted_repo_groups: (state:any) => (col:string, ascending: boolean) => {
    const items = [...state.cache.getRepoGroups].sort((a,b) => {
      if (a[col] > b[col]) {
        return ascending ? 1 : -1
      } else if (a[col] < b[col]) {
        return ascending ? -1 : 1
      }
      return 0;
    })
    return items
  },
  loaded_repos: (state:any) => {
      return state.cache.getRepos != null;
  },
  loaded_groups: (state:any) => {
      return state.cache.getRepoGroups != null;
  },
  getRepoByURL: (state:any) => (url:string, rg_name?:string) => {
      if (rg_name != null) {
          return state.cache['repoRelations'][rg_name][url]
      }

      for(var name in state.cache['repoRelations']) {

          for(var prop in state.cache['repoRelations'][name]) {
              if (prop == url) {
                  return state.cache['repoRelations'][name][url]
              }
          }
      }
      return undefined
  },
};