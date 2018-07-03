from git import Repo,remote

commit_name = raw_input("Enter Commit Name: ")

rw_dir = '/mnt/elvisdata/work/exchange-ui'
repo = Repo(rw_dir)

add = repo.git.add(".")

commit =  repo.git.commit("-m", commit_name)

origin = repo.remote(name='origin')
origin.push()