const db = require("../models");
const Vertex = db.vertex;
const Edge = db.edge;




// Create Map
exports.createMap = async (req, res) => {
  try {
    const cols = "ABCDEFG".split("");

    let vertices = []
    let edges = []

    const addEdge = (a,b) => {  
      edges.push({
        sourceVertexId: a,
        destinationVertexId: b,
        name: `${a} - ${b}`,
      })
    }
    
    const addVertex = (a) => {
      vertices.push({name: a})
    }

    // add the vertices
    for (let i = 1; i <= 7; i++) {
      for (let j = 0; j < cols.length; j++) {
        addVertex(cols[j] + i);
      }
    }

    // create the edges
    // horizontal Edges

    for (let i = 0; i < 7; i++) {
      for (let j = 1; j < 7; j++) {
        const letter = cols[i];
        switch (letter) {
          case "A":
          case "C":
          case "E":
          case "G":
            addEdge(letter + j, cols[i] + Number(j + 1));
            break;
          case "B":
          case "F":
            addEdge(cols[i] + Number(j + 1), letter + j);
            break;
          case "D":
            addEdge(letter + j, cols[i] + Number(j + 1));
            addEdge(cols[i] + Number(j + 1), letter + j);
            break;
        }
      }
    }

    // Vertical Edges
    for (let i = 1; i <= 7; i++) {
      for (let j = 0; j < 6; j++) {
        const l1 = cols[j] + i;
        const l2 = cols[j + 1] + i;
        switch (i) {
          case 1:
          case 3:
          case 5:
          case 7:
            addEdge(l2, l1);
            break;
          case 2:
          case 6:
            addEdge(l2, l1);
            addEdge(l1, l2);
            break;
          case 4:
            addEdge(l1, l2);
            break;
        }
      }
    }

    db.sequelize.transaction(async (t) => {
      const upsertQueries = vertices.map((vertex) => {
        return Vertex.bulkCreate([vertex], {
          updateOnDuplicate: ['name'],
          transaction: t,
        });
      });
      await Promise.all(upsertQueries);
    }).catch((error) => {
      throw error
    });
    
    db.sequelize.transaction(async (t) => {
      const upsertQueries = edges.map((edge) => {
        return Edge.bulkCreate([edge], {
          updateOnDuplicate: ['sourceVertexId', 'destinationVertexId'],
          transaction: t,
        });
      });
    
      await Promise.all(upsertQueries);
    })
      .then(() => {
        console.log('Bulk upsert successful.');
        res.status(200).json({ message: "Success" })
      })
      .catch((error) => {
        console.error('Error performing bulk upsert:', error);
        throw error
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};


exports.getMap = async (req, res) => {

  try {
    const vertices = await Vertex.findAll({ where: null });
    const edges = await Edge.findAll({ where: null });
    res.json({
      vertices,
      edges
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch couriers' });
  }

}