// src/components/filter/SneakerFilter.jsx
import React, { useState } from "react";
import { Checkbox, Button, Collapse } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Panel } = Collapse;

const SneakerFilter = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [filters, setFilters] = useState({
    gender: searchParams.get("gender") || "",
    brand: searchParams.getAll("brand").filter(Boolean),
    producttype: searchParams.getAll("producttype").filter(Boolean),
  });

  const handleCheckboxChange = (type, value, checked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: checked ? value : "", // For gender, set to value directly
    }));
  };

  const handleApplyFilter = () => {
    const queryStringParts = [];

    if (filters.gender) {
      queryStringParts.push(`gender=${filters.gender}`); // Only include gender if it's selected
    }
    if (filters.brand.length > 0) {
      queryStringParts.push(`brand=${filters.brand.join(",")}`);
    }
    if (filters.producttype.length > 0) {
      queryStringParts.push(`producttype=${filters.producttype.join(",")}`);
    }

    const queryString = queryStringParts.join("&");
    navigate(`/products${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
      <Collapse defaultActiveKey={["1", "2", "3"]} expandIconPosition="right">
        <Panel header="Gender +" key="1">
          <Checkbox.Group style={{ width: "100%", marginBottom: 20 }}>
            <Checkbox
              value="men"
              checked={filters.gender === "men"}
              onChange={(e) =>
                handleCheckboxChange("gender", "men", e.target.checked)
              }
            >
              Men
            </Checkbox>
            <Checkbox
              value="women"
              checked={filters.gender === "women"}
              onChange={(e) =>
                handleCheckboxChange("gender", "women", e.target.checked)
              }
            >
              Women
            </Checkbox>
          </Checkbox.Group>
        </Panel>
        <Panel header="Brand +" key="2">
          <Checkbox.Group style={{ width: "100%", marginBottom: 20 }}>
            <Checkbox
              value="nike"
              checked={filters.brand.includes("nike")}
              onChange={(e) =>
                handleCheckboxChange("brand", "nike", e.target.checked)
              }
            >
              Nike
            </Checkbox>
            <Checkbox
              value="adidas"
              checked={filters.brand.includes("adidas")}
              onChange={(e) =>
                handleCheckboxChange("brand", "adidas", e.target.checked)
              }
            >
              Adidas
            </Checkbox>
            <Checkbox
              value="puma"
              checked={filters.brand.includes("puma")}
              onChange={(e) =>
                handleCheckboxChange("brand", "puma", e.target.checked)
              }
            >
              Puma
            </Checkbox>
          </Checkbox.Group>
        </Panel>
        <Panel header="Product Type +" key="3">
          <Checkbox.Group style={{ width: "100%", marginBottom: 20 }}>
            <Checkbox
              value="Running"
              checked={filters.producttype.includes("Running")}
              onChange={(e) =>
                handleCheckboxChange("producttype", "Running", e.target.checked)
              }
            >
              Running
            </Checkbox>
            <Checkbox
              value="Basketball"
              checked={filters.producttype.includes("Basketball")}
              onChange={(e) =>
                handleCheckboxChange(
                  "producttype",
                  "Basketball",
                  e.target.checked
                )
              }
            >
              Basketball
            </Checkbox>
            <Checkbox
              value="Casual"
              checked={filters.producttype.includes("Casual")}
              onChange={(e) =>
                handleCheckboxChange("producttype", "Casual", e.target.checked)
              }
            >
              Casual
            </Checkbox>
            <Checkbox
              value="Training"
              checked={filters.producttype.includes("Training")}
              onChange={(e) =>
                handleCheckboxChange(
                  "producttype",
                  "Training",
                  e.target.checked
                )
              }
            >
              Training
            </Checkbox>
          </Checkbox.Group>
        </Panel>
      </Collapse>
      <Button type="primary" onClick={handleApplyFilter}>
        Apply Filter
      </Button>
    </div>
  );
};

export default SneakerFilter;
