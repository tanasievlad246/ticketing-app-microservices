# NodeJS Microservices Full Stack App
## The app is an events tickets sales platform with a backend based on the microservices architecture

# Usage:
 - Install `skaffold`
 - Install and enable [Ingress-Nginx](https://kubernetes.github.io/ingress-nginx/deploy/)
 - Run `skaffold dev` in the root folder in your prefered context (best minikube)

# Services:
 - Auth: The authentication and authorization service for the users
 - client: The web interface for our application
 - common: The common code package for all our microservices which is under @ticketingapporg/common
