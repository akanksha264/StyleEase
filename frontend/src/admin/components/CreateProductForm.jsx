import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../state/product/Action";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { navigation } from "../../customer/components/navigation/NavigationData";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { filters } from "../../customer/components/product/FilterData";

const initialColors = [
  {
    name: "",
    sizes: [
      { name: "S", quantity: "" },
      { name: "M", quantity: "" },
      { name: "L", quantity: "" },
    ],
  },
];

const CreateProductForm = () => {
  const [colors, setColors] = useState(initialColors);

  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    colors: colors,
    discountedPrice: "",
    price: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleColorNameChange = (colorIndex, value) => {
    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[colorIndex] = { ...updatedColors[colorIndex], name: value };
      return updatedColors;
    });
  };

  const handleSizeQuantityChange = (colorIndex, sizeIndex, value) => {
    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[colorIndex].sizes[sizeIndex] = {
        ...updatedColors[colorIndex].sizes[sizeIndex],
        quantity: value,
      };
      return updatedColors;
    });
  };

  const handleAddColor = () => {
    setColors((prevColors) => {
      const newColor = {
        name: "",
        sizes: [
          { name: "S", quantity: 0 },
          { name: "M", quantity: 0 },
          { name: "L", quantity: 0 },
        ],
      };
      const updatedColors = [...prevColors, newColor];

      return updatedColors;
    });
  };

  const handleRemoveColor = (colorIndex) => {
    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors.splice(colorIndex, 1);
      return updatedColors;
    });
  };

  useEffect(() => {
    // This effect runs whenever 'colors' changes
    setProductData((prevData) => ({
      ...prevData,
      colors: colors,
    }));
  }, [colors]);

  const resetForm = () => {
    setColors(initialColors);
    setProductData({
      imageUrl: "",
      brand: "",
      title: "",
      colors: initialColors,
      discountedPrice: "",
      price: "",
      topLevelCategory: "",
      secondLevelCategory: "",
      thirdLevelCategory: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createProduct(productData));
      resetForm();
    } catch (error) {
      // Handle any errors that occurred during the dispatch
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center"
      >
        Add New Product
      </Typography>

      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="TopLevelCategory"
                required
              >
                {navigation.categories.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="SecondLevelCategory"
                required
              >
                {navigation.categories.map((item) => {
                  if (item.id === productData.topLevelCategory) {
                    return item.sections.map((section) => (
                      <MenuItem key={section.id} value={section.id}>
                        {section.name}
                      </MenuItem>
                    ));
                  }
                  return null;
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="ThirdLevelCategory"
                required
              >
                {navigation.categories.map((item) => {
                  if (item.id === productData.topLevelCategory) {
                    return item.sections.map((section) => {
                      if (section.id === productData.secondLevelCategory) {
                        return section.items
                          .filter((row) => row.name !== "Browse All")
                          .map((row) => (
                            <MenuItem key={row.id} value={row.id}>
                              {row.name}
                            </MenuItem>
                          ));
                      }
                      return null;
                    });
                  }
                  return null;
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid container item xs={12}>
            {colors.map((color, colorIndex) => (
              <div key={colorIndex} className="mb-5">
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>{`Color ${colorIndex + 1}`}</InputLabel>
                      <Select
                        id={`color-select-${colorIndex}`}
                        value={color.name}
                        onChange={(e) =>
                          handleColorNameChange(colorIndex, e.target.value)
                        }
                        label={`Color ${colorIndex + 1}`}
                        fullWidth
                        required
                      >
                        {filters
                          .find((filter) => filter.id === "color")
                          .options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    {colorIndex !== 0 && (
                      <IconButton onClick={() => handleRemoveColor(colorIndex)}>
                        <RemoveCircleOutline />
                      </IconButton>
                    )}
                  </Grid>

                  <Grid item>
                    {colorIndex === colors.length - 1 && (
                      <IconButton onClick={handleAddColor}>
                        <AddCircleOutline />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>

                <Box mt={2}>
                  <Grid container spacing={2}>
                    {color.sizes.map((size, sizeIndex) => (
                      <Grid item key={sizeIndex} xs={12} sm={4}>
                        <TextField
                          label={`Size ${size.name}`}
                          value={size.quantity}
                          onChange={(e) =>
                            handleSizeQuantityChange(
                              colorIndex,
                              sizeIndex,
                              e.target.value
                            )
                          }
                          required
                          type="number"
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </div>
            ))}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              type="submit"
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default CreateProductForm;
