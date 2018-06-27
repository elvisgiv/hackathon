from git import Repo,remote

rw_dir = '/mnt/elvisdata/work/exchange-ui'
repo = Repo(rw_dir)

add = repo.git.add(".")

commit =  repo.git.commit("-m", "test python commit")


origin = repo.remote(name='origin')
origin.push()