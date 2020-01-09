## Register and Session

### Register
> **URL:** http://localhost:3333/api/register <br>
> **METHOD:** POST <br>
> **PARAMS:** {name, email, password, gender}

### Session
> **URL:** http://localhost:3333/api/session <br>
> **METHOD:** POST <br>
> **PARAMS:** {email, password}
> **RESPONSE:** {user, token}

## Posts

### List posts
> **URL:** http://localhost:3333/api/posts <br>
> **METHOD:** GET <br>
> **PARAMS:** Header: Authorization <br>
> **RESPONSE:** {posts}

### List one post
> **URL:** http://localhost:3333/api/posts/{id} <br>
> **METHOD:** GET <br>
> **PARAMS:** Header: Authorization <br>
> **RESPONSE:** {post}

### Create Post
> **URL:** http://localhost:3333/api/posts <br>
> **METHOD:** POST <br>
> **PARAMS:** {text, image} Header: Authorization <br>
> **RESPONSE:** {posts}

### Edit Post
> **URL:** http://localhost:3333/api/posts/{id} <br>
> **METHOD:** PUT <br>
> **PARAMS:** {text, image} Header: Authorization <br>
> **RESPONSE:** {posts}

### Create Post
> **URL:** http://localhost:3333/api/posts/{id} <br>
> **METHOD:** DELETE <br>
> **PARAMS:** Header: Authorization <br>
> **RESPONSE:** {post deleted}

