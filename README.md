# Github-Visualiser
An app created as part of my third year Software Engineering module which visualises data using the Github API.
### Prerequisites
To run this project, you will need the following installed:

- Docker

### Running the Project
Navigate to the `github-visualiser` folder and run the following terminal commands:

```
docker build -t <your_image_name_here> .
docker run -it -p 8080:3000 --rm <your_image_name>
```
The docker container is now running and the project should be accessible on `localhost:8080`.

### Project Description
This project was created as part of an assignment in the CSU33012 Software Engineering module in Trinity College Dublin. The project accepts a user input of a github username and the project will interogate the GitHub REST API with this username and present to the user the data retrieved from the API. The data is visualised in three sections.

1. Basic User Data i.e Name, Followers, Following etc.
2. Intermediate User Data i.e graphing their most contributed to repositories.
3. Analytics based on the User Data i.e determining their most active month and hour on github.
