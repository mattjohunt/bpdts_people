# README

## Instructions for Local deployment

To deploy the application locally first ensure that you have Docker installed, you can find instructions for a basic Ubuntu distro here:
https://docs.docker.com/engine/install/ubuntu/

You then need to run the following commands to start the Docker container:
```sh
docker build -t people .
docker run -p 5000:5000 people
```

Once the Container is in a running state you can hit the API with:
```sh
curl 127.0.0.1:5000/people/peopleInLondon
```
## Thoughts on remote deployment

To most effecitvely deploy this application an orchestration tool would be used such as Docker-Swarm or Kubernetes.  An Orchestration tool would make use of a cluster of machines (nodes) that would ensure that the application remains highly available, scalable and protected.  Further improvements to remote delivery would be to make use of a managed cluster provided by one of the Cloud Providers, for example EKS, however some benefits of using an orchestration tool are as follows:

### Highly available

The application would be based over multiple nodes, and requests to the application would be load balanced across these nodes.  If one of these nodes were to fail then requests would be sent to the other nodes to ensure that requests could be completed.  The cluster would manage the state of nodes with health checks, if a node were to fail one of these health checks then it would be replaced with a new node capable of handling requests.

### Scalable

The cluster is able to react to changes in traffic by scaling both up and down, it would do this by monitoring specific metrics of the nodes and the adding or removing nodes as appropriate.  For example one of the metrics could be CPU usage, if the usage on a node becomes to high, then the cluster will provision a new node and traffic will also be sent to this node, reducing the usage across all nodes.

### Security

All nodes that are part of the Cluster will be behind a load-balancer and not directly accessible from the internet, assisigning a security certificate to the Load Balancer will enable communication via HTTPS to the Load Balancer.  Working with an orchestration tool also makes deploying security patches to your application easier by facilitating rolling updates.


## Assumptions

- The result of the API call is an array of relevant people, this array could be further iterated over and manipulated
- 60 miles within a radius on London is assumed to be between 50 - 52 Latitude and -1 - 1 Longitude
