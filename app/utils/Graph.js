class Graph {
  constructor() {
    this.vertices = [];
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    this.vertices.push(vertex);
    this.adjacencyList[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight = 1) {
    this.adjacencyList[vertex1][vertex2] = weight;
  }

  changeWeight(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
  }

  vertexWithMinDistance(distances, visited) {
    let minDistance = Infinity,
      minVertex = null;
    for (let vertex in distances) {
      let distance = distances[vertex];
      if (distance < minDistance && !visited.has(vertex)) {
        minDistance = distance;
        minVertex = vertex;
      }
    }
    return minVertex;
  }

  dijkstra(source) {
    let distances = {},
      parents = {},
      visited = new Set();
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i] === source) {
        distances[source] = 0;
      } else {
        distances[this.vertices[i]] = Infinity;
      }
      parents[this.vertices[i]] = null;
    }

    let currVertex = this.vertexWithMinDistance(distances, visited);

    while (currVertex !== null) {
      let distance = distances[currVertex],
        neighbors = this.adjacencyList[currVertex];
      for (let neighbor in neighbors) {
        let newDistance = distance + neighbors[neighbor];
        if (distances[neighbor] > newDistance) {
          distances[neighbor] = newDistance;
          parents[neighbor] = currVertex;
        }
      }
      visited.add(currVertex);
      currVertex = this.vertexWithMinDistance(distances, visited);
    }

    // console.log(parents);
    // console.log(distances);
    return {
      parents,
      distances,
    };
  }

  findPath(data, source, destination) {
    function findPathRecursive(currentNode, targetNode, path = []) {
      path.push(currentNode);
      if (currentNode === targetNode) {
        return path;
      }

      for (const key in data) {
        if (data[key] === currentNode) {
          return findPathRecursive(key, targetNode, path);
        }
      }

      // If the target node is not found, remove the current node from the path
      path.pop();
      return null;
    }

    const path = findPathRecursive(source, destination);

    if (path) {
      return path.join(" -> ");
    } else {
      return "Path not found.";
    }
  }

  shortestPathTraversal(source) {
    const { parents, distances } = this.dijkstra(source);
    const result = {};

    for (const vertex in parents) {
      const path = [];
      let currentVertex = vertex;

      // Build the path from the current vertex to the source vertex
      while (currentVertex !== null) {
        path.push(currentVertex);
        currentVertex = parents[currentVertex];
      }

      // Reverse the path to get the correct order
      path.reverse();
      result[vertex] = {
        path: path,
        distance: distances[vertex],
      };
    }

    return result;
  }
}

module.exports.Graph = Graph;