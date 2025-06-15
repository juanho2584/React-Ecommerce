import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch de la API cuando el usuario escribe
  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
        setResults(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    const delayDebounce = setTimeout(fetchData, 500); // debounce
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Buscar Productos</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      <div className="row">
        {results.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.title}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted">{product.description.slice(0, 60)}...</p>
                <div className="mt-auto">
                  <span className="badge bg-primary mb-2">${product.price}</span>
                  <div>
                    <button className="btn btn-sm btn-outline-primary w-100">Ver más</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!loading && query && results.length === 0 && (
          <div className="text-center text-muted">No se encontraron productos</div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
