# always check for client payload like when getting /companies/1/jobs check for that company exist or not

# to just check existence of record use existsBy method of typeorm it is more efficient it returns boolean

# no need pointless middleman like we are getting company related jobs postings we receive req at company controller and call company service here company service if just calling job service method and not adding any value like checking company existence we do not need it
