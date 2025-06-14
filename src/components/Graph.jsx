import React, { useState } from 'react';
import '../index.css'; 

const Graph = ({ onBack }) => {
  const [graphType, setGraphType] = useState(null);

  if (!graphType) {
    return (
      <div className="container">
        <h2>Graph Algorithms</h2>
        <div className="input-container">
          <button className="btn" onClick={() => setGraphType('dijkstra')}>Dijkstra's Algorithm</button>
          <button className="btn" onClick={() => setGraphType('primKruskal')}>Prim's & Kruskal's</button>
          <button className="btn" onClick={() => setGraphType('bellmanFord')}>Bellman-Ford</button>
          <button className="btn" onClick={() => setGraphType('floydWarshall')}>Floyd-Warshall</button>
          <button className="btn" onClick={() => setGraphType('topologicalSort')}>Topological Sort</button>
          <button className="btn" onClick={() => setGraphType('unionFind')}>Union-Find</button>
          <button className="btn-back" onClick={onBack}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {graphType === 'dijkstra' && <Dijkstra onBack={() => setGraphType(null)} />}
      {graphType === 'primKruskal' && <PrimKruskal onBack={() => setGraphType(null)} />}
      {graphType === 'bellmanFord' && <BellmanFord onBack={() => setGraphType(null)} />}
      {graphType === 'floydWarshall' && <FloydWarshall onBack={() => setGraphType(null)} />}
      {graphType === 'topologicalSort' && <TopologicalSort onBack={() => setGraphType(null)} />}
      {graphType === 'unionFind' && <UnionFind onBack={() => setGraphType(null)} />}
    </div>
  );
};

/* Dijkstra's Algorithm Component */
const Dijkstra = ({ onBack }) => {
  const [numVertices, setNumVertices] = useState('');
  const [matrixInput, setMatrixInput] = useState('');
  const [sourceVertex, setSourceVertex] = useState('');
  const [distances, setDistances] = useState(null);
  const [error, setError] = useState('');

  const runDijkstra = () => {
    setError('');
    const n = Number(numVertices);
    const src = Number(sourceVertex);
    if (isNaN(n) || n <= 0) {
      setError('Number of vertices must be a positive integer');
      return;
    }
    if (isNaN(src) || src < 0 || src >= n) {
      setError(`Source vertex must be between 0 and ${n - 1}`);
      return;
    }
    const rows = matrixInput.trim().split('\n');
    if (rows.length !== n) {
      setError(`Adjacency matrix must have exactly ${n} rows`);
      return;
    }
    const graph = [];
    for (let i = 0; i < n; i++) {
      const row = rows[i].trim().split(/\s+/).map(Number);
      if (row.length !== n) {
        setError(`Row ${i + 1} must have ${n} elements`);
        return;
      }
      graph.push(row.map((val, idx) => (val === 0 && idx !== i ? Number.MAX_SAFE_INTEGER : val)));
    }
    const dist = dijkstraAlgorithm(graph, src);
    setDistances(dist);
  };

  return (
    <div className="container">
      <h3>Dijkstra's Algorithm</h3>
      <label>Number of vertices:</label>
      <input
        type="number"
        value={numVertices}
        onChange={e => setNumVertices(e.target.value)}
        className="input-style"
        placeholder="e.g. 4"
      />
      <label>Adjacency matrix (each row one line, space-separated):</label>
      <textarea
        value={matrixInput}
        onChange={e => setMatrixInput(e.target.value)}
        rows={numVertices || 4}
        className="input-style"
        placeholder={`e.g.\n0 2 0 6\n2 0 3 8\n0 3 0 0\n6 8 0 0`}
      />
      <label>Source vertex (0-based index):</label>
      <input
        type="number"
        value={sourceVertex}
        onChange={e => setSourceVertex(e.target.value)}
        className="input-style"
        placeholder="e.g. 0"
      />
      <div className="btn-container">
        <button className="btn" onClick={runDijkstra}>Run</button>
        <button className="btn-back" onClick={onBack}>Back</button>
      </div>
      {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
      {distances && (
        <div className="output-text">
          <strong>Shortest distances from vertex {sourceVertex}:</strong>
          <pre>
            {distances.map((d, i) => `To vertex ${i}: ${d === Number.MAX_SAFE_INTEGER ? 'Infinity' : d}`).join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
};

// Dijkstra's Algorithm logic
function dijkstraAlgorithm(graph, start) {
  const n = graph.length;
  const dist = new Array(n).fill(Number.MAX_SAFE_INTEGER);
  const visited = new Array(n).fill(false);
  dist[start] = 0;

  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && (u === -1 || dist[v] < dist[u])) u = v;
    }
    if (dist[u] === Number.MAX_SAFE_INTEGER) break;
    visited[u] = true;

    for (let v = 0; v < n; v++) {
      if (!visited[v] && graph[u][v] !== Number.MAX_SAFE_INTEGER) {
        dist[v] = Math.min(dist[v], dist[u] + graph[u][v]);
      }
    }
  }

  return dist;
}

/* Prim's and Kruskal's Algorithm Component */
const PrimKruskal = ({ onBack }) => {
  const [numVertices, setNumVertices] = useState('');
  const [matrixInput, setMatrixInput] = useState('');
  const [mstEdges, setMstEdges] = useState(null);
  const [error, setError] = useState('');

  const runPrim = () => {
    setError('');
    const n = Number(numVertices);
    if (isNaN(n) || n <= 0) {
      setError('Number of vertices must be a positive integer');
      return;
    }
    const rows = matrixInput.trim().split('\n');
    if (rows.length !== n) {
      setError(`Adjacency matrix must have exactly ${n} rows`);
      return;
    }
    const graph = [];
    for (let i = 0; i < n; i++) {
      const row = rows[i].trim().split(/\s+/).map(Number);
      if (row.length !== n) {
        setError(`Row ${i + 1} must have ${n} elements`);
        return;
      }
      graph.push(row.map((val, idx) => (val === 0 && idx !== i ? Number.MAX_SAFE_INTEGER : val)));
    }
    const mst = primAlgorithm(graph);
    setMstEdges(mst);
  };

  return (
    <div className="container">
      <h3>Prim's Algorithm</h3>
      <label>Number of vertices:</label>
      <input
        type="number"
        value={numVertices}
        onChange={e => setNumVertices(e.target.value)}
        className="input-style"
        placeholder="e.g. 4"
      />
      <label>Adjacency matrix (each row one line, space-separated):</label>
      <textarea
        value={matrixInput}
        onChange={e => setMatrixInput(e.target.value)}
        rows={numVertices || 4}
        className="input-style"
        placeholder={`e.g.\n0 2 0 6\n2 0 3 8\n0 3 0 0\n6 8 0 0`}
      />
      <div className="btn-container">
        <button className="btn" onClick={runPrim}>Run Prim</button>
        <button className="btn-back" onClick={onBack}>Back</button>
      </div>
      {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
      {mstEdges && (
        <div className="output-text">
          <strong>Minimum Spanning Tree Edges:</strong>
          <pre>
            {mstEdges.map((e, i) => `Edge: ${e.from} - ${e.to} Weight: ${e.weight}`).join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
};

// Prim's Algorithm logic
function primAlgorithm(graph) {
  const n = graph.length;
  const key = new Array(n).fill(Number.MAX_SAFE_INTEGER);
  const parent = new Array(n).fill(-1);
  const inMST = new Array(n).fill(false);

  key[0] = 0;

  for (let count = 0; count < n - 1; count++) {
    let u = -1;
    let minKey = Number.MAX_SAFE_INTEGER;

    for (let v = 0; v < n; v++) {
      if (!inMST[v] && key[v] < minKey) {
        minKey = key[v];
        u = v;
      }
    }

    inMST[u] = true;

    for (let v = 0; v < n; v++) {
      if (graph[u][v] !== Number.MAX_SAFE_INTEGER && !inMST[v] && graph[u][v] < key[v]) {
        key[v] = graph[u][v];
        parent[v] = u;
      }
    }
  }

  const mstEdges = [];
  for (let v = 1; v < n; v++) {
    mstEdges.push({ from: parent[v], to: v, weight: graph[v][parent[v]] });
  }
  return mstEdges;
}

/* Bellman-Ford Algorithm Component */
const BellmanFord = ({ onBack }) => {
  const [numVertices, setNumVertices] = useState('');
  const [numEdges, setNumEdges] = useState('');
  const [edgeInput, setEdgeInput] = useState('');
  const [distances, setDistances] = useState(null);
  const [error, setError] = useState('');

  const runBellmanFord = () => {
    setError('');
    const n = Number(numVertices);
    const m = Number(numEdges);

    if (isNaN(n) || n <= 0) {
      setError('Number of vertices must be a positive integer');
      return;
    }
    if (isNaN(m) || m < 0) {
      setError('Number of edges must be a non-negative integer');
      return;
    }
    const lines = edgeInput.trim().split('\n');
    if (lines.length !== m) {
      setError(`Number of edges does not match lines entered (${m} expected, got ${lines.length})`);
      return;
    }

    let edges = [];
    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].trim().split(/\s+/).map(Number);
      if (parts.length !== 3) {
        setError(`Line ${i + 1} must contain exactly three numbers: source destination weight`);
        return;
      }
      edges.push({ source: parts[0], dest: parts[1], weight: parts[2] });
    }

    const dist = bellmanFordAlgorithm(edges, n);
    setDistances(dist);
  };

  return (
    <div className="container">
      <h3>Bellman-Ford Algorithm</h3>
      <label>Number of vertices:</label>
      <input
        type="number"
        value={numVertices}
        onChange={e => setNumVertices(e.target.value)}
        className="input-style"
        placeholder="e.g. 4"
      />
      <label>Number of edges:</label>
      <input
        type="number"
        value={numEdges}
        onChange={e => setNumEdges(e.target.value)}
        className="input-style"
        placeholder="e.g. 5"
      />
      <label>Edges (source destination weight per line):</label>
      <textarea
        value={edgeInput}
        onChange={e => setEdgeInput(e.target.value)}
        rows={numEdges || 5}
        className="input-style"
        placeholder={`e.g.\n0 1 2\n0 3 6\n1 2 3\n1 3 8\n2 3 5`}
      />
      <div className="btn-container">
        <button className="btn" onClick={runBellmanFord}>Run</button>
        <button className="btn-back" onClick={onBack}>Back</button>
      </div>
      {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
      {distances && (
        <div className="output-text">
          <strong>Shortest distances from vertex 0:</strong>
          <pre>
            {distances.map((d, i) => `To vertex ${i}: ${d === Number.MAX_SAFE_INTEGER ? 'Infinity' : d}`).join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
};

// Bellman-Ford Algorithm logic
function bellmanFordAlgorithm(edges, n) {
  const dist = new Array(n).fill(Number.MAX_SAFE_INTEGER);
  dist[0] = 0; // Starting from vertex 0

  for (let i = 0; i < n - 1; i++) {
    for (let edge of edges) {
      if (dist[edge.source] !== Number.MAX_SAFE_INTEGER && dist[edge.source] + edge.weight < dist[edge.dest]) {
        dist[edge.dest] = dist[edge.source] + edge.weight;
      }
    }
  }

  // Check for negative-weight cycles
  for (let edge of edges) {
    if (dist[edge.source] !== Number.MAX_SAFE_INTEGER && dist[edge.source] + edge.weight < dist[edge.dest]) {
      throw new Error('Graph contains a negative-weight cycle');
    }
  }

  return dist;
}

/* Floyd-Warshall Algorithm Component */
const FloydWarshall = ({ onBack }) => {
  const [numVertices, setNumVertices] = useState('');
  const [matrixInput, setMatrixInput] = useState('');
  const [distances, setDistances] = useState(null);
  const [error, setError] = useState('');

  const runFloydWarshall = () => {
    setError('');
    const n = Number(numVertices);
    if (isNaN(n) || n <= 0) {
      setError('Number of vertices must be a positive integer');
      return;
    }
    const rows = matrixInput.trim().split('\n');
    if (rows.length !== n) {
      setError(`Adjacency matrix must have exactly ${n} rows`);
      return;
    }
    const graph = [];
    for (let i = 0; i < n; i++) {
      const row = rows[i].trim().split(/\s+/).map(Number);
      if (row.length !== n) {
        setError(`Row ${i + 1} must have ${n} elements`);
        return;
      }
      graph.push(row.map((val, idx) => (val === 0 && idx !== i ? Number.MAX_SAFE_INTEGER : val)));
    }
    const dist = floydWarshallAlgorithm(graph);
    setDistances(dist);
  };

  return (
    <div className="container">
      <h3>Floyd-Warshall Algorithm</h3>
      <label>Number of vertices:</label>
      <input
        type="number"
        value={numVertices}
        onChange={e => setNumVertices(e.target.value)}
        className="input-style"
        placeholder="e.g. 4"
      />
      <label>Adjacency matrix (each row one line, space-separated):</label>
      <textarea
        value={matrixInput}
        onChange={e => setMatrixInput(e.target.value)}
        rows={numVertices || 4}
        className="input-style"
        placeholder={`e.g.\n0 3 0 5\n3 0 1 0\n0 1 0 2\n5 0 2 0`}
      />
      <div className="btn-container">
        <button className="btn" onClick={runFloydWarshall}>Run</button>
        <button className="btn-back" onClick={onBack}>Back</button>
      </div>
      {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
      {distances && (
        <div className="output-text">
          <strong>Shortest distances between all pairs of vertices:</strong>
          <pre>
            {distances.map((row, i) => `From vertex ${i}: ${row.map(d => d === Number.MAX_SAFE_INTEGER ? 'Infinity' : d).join(', ')}`).join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
};

// Floyd-Warshall Algorithm logic
function floydWarshallAlgorithm(graph) {
  const n = graph.length;
  const dist = graph.map(row => row.slice());

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] !== Number.MAX_SAFE_INTEGER && dist[k][j] !== Number.MAX_SAFE_INTEGER) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  return dist;
}

/* Topological Sort Component */
const TopologicalSort = ({ onBack }) => {
  const [numVertices, setNumVertices] = useState('');
  const [edgesInput, setEdgesInput] = useState('');
  const [sortedOrder, setSortedOrder] = useState(null);
  const [error, setError] = useState('');

  const runTopologicalSort = () => {
    setError('');
    const n = Number(numVertices);
    if (isNaN(n) || n <= 0) {
      setError('Number of vertices must be a positive integer');
      return;
    }
    const edges = edgesInput.trim().split('\n').map(line => {
      const parts = line.trim().split(/\s+/).map(Number);
      if (parts.length !== 2) {
        throw new Error('Each line must contain exactly two numbers: source destination');
      }
      return { from: parts[0], to: parts[1] };
    });

    const order = topologicalSort(n, edges);
    setSortedOrder(order);
  };

  return (
    <div className="container">
      <h3>Topological Sort</h3>
      <label>Number of vertices:</label>
      <input
        type="number"
        value={numVertices}
        onChange={e => setNumVertices(e.target.value)}
        className="input-style"
        placeholder="e.g. 4"
      />
      <label>Edges (source destination per line):</label>
      <textarea
        value={edgesInput}
        onChange={e => setEdgesInput(e.target.value)}
        rows={5}
        className="input-style"
        placeholder={`e.g.\n0 1\n0 2\n1 2\n1 3\n2 3`}
      />
      <div className="btn-container">
        <button className="btn" onClick={runTopologicalSort}>Run</button>
        <button className="btn-back" onClick={onBack}>Back</button>
      </div>
      {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
      {sortedOrder && (
        <div className="output-text">
          <strong>Topological Sort Order:</strong>
          <pre>{sortedOrder.join(' -> ')}</pre>
        </div>
      )}
    </div>
  );
};

// Topological Sort logic
function topologicalSort(n, edges) {
  const adjList = Array.from({ length: n }, () => []);
  const inDegree = Array(n).fill(0);

  edges.forEach(edge => {
    adjList[edge.from].push(edge.to);
    inDegree[edge.to]++;
  });

  const queue = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const sortedOrder = [];
  while (queue.length > 0) {
    const vertex = queue.shift();
    sortedOrder.push(vertex);

    adjList[vertex].forEach(neighbor => {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }

  if (sortedOrder.length !== n) {
    throw new Error('Graph has a cycle, topological sort not possible');
  }

  return sortedOrder;
}

/* Union-Find Component */
const UnionFind = ({ onBack }) => {
  const [numElements, setNumElements] = useState('');
  const [operationsInput, setOperationsInput] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const runUnionFind = () => {
    setError('');
    const n = Number(numElements);
    if (isNaN(n) || n <= 0) {
      setError('Number of elements must be a positive integer');
      return;
    }
    const operations = operationsInput.trim().split('\n').map(line => {
      const parts = line.trim().split(/\s+/).map(Number);
      if (parts.length !== 3) {
        throw new Error('Each line must contain exactly three numbers: operation a b');
      }
      return { operation: parts[0], a: parts[1], b: parts[2] }; // 0 for union, 1 for find
    });

    const uf = new UnionFindStructure(n);
    const output = operations.map(op => {
      if (op.operation === 0) {
        uf.union(op.a, op.b);
        return `Union(${op.a}, ${op.b})`;
      } else if (op.operation === 1) {
        const rootA = uf.find(op.a);
        const rootB = uf.find(op.b);
        return `Find(${op.a}) = ${rootA}, Find(${op.b}) = ${rootB}`;
      }
    });

    setResults(output);
  };

  return (
    <div className="container">
      <h3>Union-Find</h3>
      <label>Number of elements:</label>
      <input
        type="number"
        value={numElements}
        onChange={e => setNumElements(e.target.value)}
        className="input-style"
        placeholder="e.g. 5"
      />
      <label>Operations (0 for union, 1 for find):</label>
      <textarea
        value={operationsInput}
        onChange={e => setOperationsInput(e.target.value)}
        rows={5}
        className="input-style"
        placeholder={`e.g.\n0 0 1\n1 0 1\n0 1 2\n1 1 2`}
      />
      <div className="btn-container">
        <button className="btn" onClick={runUnionFind}>Run</button>
        <button className="btn-back" onClick={onBack}>Back</button>
      </div>
      {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
      {results && (
        <div className="output-text">
          <strong>Results:</strong>
          <pre>{results.join('\n')}</pre>
        </div>
      )}
    </div>
  );
};

// Union-Find logic
class UnionFindStructure {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}

export default Graph;
