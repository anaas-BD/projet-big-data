const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
// Serve static files

const corsOptions = {
  origin: "http://127.0.0.1:5500", // ou 'http://localhost:5500' 
};

app.use(cors(corsOptions));

// Spécifier le type MIME pour les fichiers CSS
express.static.mime.define({ "text/css": ["css"] });


mongoose
  .connect("mongodb://127.0.0.1:27017/etablissements", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });
  const etablissementSchema = new mongoose.Schema({
    localisation: {
      type: [String],
      required: true,
    },
    siege_lib: {
      type: String,
      required: true,
    },
    type_d_etablissement: {
      type: String,
      required: true,
    },
    implantation_lib: {
      type: String,
      required: true,
    },
    coordonnees: {
      lon: {
        type: Number,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
    },
    bcnag_n_nature_uai_libelle_editi: {
      type: String,
      required: true,
    },
    services: {
      type: [String],
      required: true,
    },
    date_ouverture: {
      type: Date,
      required: true,
    },
    effectif: {
      type: Number,
    },
    bcnag_n_type_uai_libelle_edition: {
      type: String,
      required: true,
    },
    uai: {
      type: String,
      required: true,
    },
    ur: {
      type: String,
      required: true,
    },
    ur_lib: {
      type: String,
      required: true,
    },
    etablissement_uai: {
      type: String,
      required: true,
    },
    sigle: {
      type: String,
      required: true,
    },
    identifiant_eter: {
      type: String,
      required: true,
    },
    identifiant_wikidata: {
      type: String,
      required: true,
    },
    element_wikidata: {
      type: String,
      required: true,
    },
    identifiant_grid: {
      type: String,
      required: true,
    },
    element_grid: {
      type: String,
      required: true,
    },
    com_code: {
      type: String,
      required: true,
    },
    com_nom: {
      type: String,
      required: true,
    },
    uucr_id: {
      type: String,
      required: true,
    },
    uucr_nom: {
      type: String,
      required: true,
    },
    dep_id: {
      type: String,
      required: true,
    },
    dep_nom: {
      type: String,
      required: true,
    },
    aca_id: {
      type: String,
      required: true,
    },
    aca_nom: {
      type: String,
      required: true,
    },
    reg_id: {
      type: String,
      required: true,
    },
    reg_nom: {
      type: String,
      required: true,
    },
    code_pays: {
      type: Number,
      required: true,
    },
    mention_distribution: {
      type: String,
    },
    adresse_uai: {
      type: String,
      required: true,
    },
    lieu_dit_uai: {
      type: String,
    },
    boite_postale_uai: {
      type: String,
    },
    code_postal_uai: {
      type: String,
      required: true,
    },
    localite_acheminement_uai: {
      type: String,
      required: true,
    },
    pays_etranger_acheminement: {
      type: String,
    },
    type_uai: {
      type: String,
      required: true,
    },
    nature_uai: {
      type: String,
      required: true,
    },
  });

const Etablissement = mongoose.model("names", etablissementSchema);

app.get("/etablissements", (req, res) => {
  Etablissement.find({})
    .then(function (name) {
      res.json(name);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/etablissements/:ville", async (req, res) => {
  const ville = req.params.ville;
  try {
    const etablissements = await Etablissement.find({
      localite_acheminement_uai: ville,
    });
    res.send(etablissements);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3001, () => {
  console.log("server is Running");
});