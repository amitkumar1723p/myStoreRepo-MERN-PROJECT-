import ProductModel from "../Model/ProductModel.js";
import UserModel from "../Model/UserModel.js";
import { SendError } from "../Utils/error.js";
import ApiFeture from "../Utils/ApiFeatures.js";
import cloudinary from "cloudinary";
// Create Product      (Admin and Owner Routes)

export const CreateProduct = async (req, res) => {
  try {
    req.body.createproductuser = req.user.id;
    const productdata = new ProductModel(req.body);
    let productimages = [];

    if (!req.files) {
      let message = "Image File is Required";
      return res.status(404).json({ success: false, error: message });
    }

    if (!req.files["images[]"]) {
      let message = "Image File is Required";
      return res.status(404).json({ success: false, error: message });
    }

    if (req.files["images[]"].length == undefined) {
      productimages.push(req.files["images[]"].tempFilePath);
    } else {
      productimages = req.files["images[]"].map((imagedata) => {
        return imagedata.tempFilePath;
      });
    }

    let imageLink = [];
   

    for (let i = 0; i < productimages.length; i++) {
      const productClound = await cloudinary.v2.uploader.upload(
        productimages[i],
        { folder: "MyStore_Product" }
      );

      imageLink.push({
        public_id: productClound.public_id,
        url: productClound.url,
      });
    }

    productdata.images = imageLink;
    let product = await productdata.save();
    if (!product) {
      let message = "This Product not created";
      return SendError(res, 500, false, message, null);
    }

    let message = "Product Created Successfully";
    return res.status(201).json({ success: true, message });
  } catch (error) {
     
    if (!error.message) {
      return SendError(res, 400, false, error, null);
    }
    return SendError(res, 500, false, null, error);
  }
};

// Get All Product     Toworrow Will be Continue
export const getAllProducts = async (req, res) => {
  try {
    let querry = req.query;
    let resultperpage = querry.perpageresult || 10;
     

    let product = new ApiFeture(querry, ProductModel)
      .FilterProductinPrice()
      .SearchProduct()
      .productperpage(resultperpage);

    let findproduct = await product.ProductModel;
    let myproduct = new ApiFeture(querry, ProductModel)
      .FilterProductinPrice()
      .SearchProduct();
    let findproductlength = await myproduct.ProductModel;

    return res.status(200).json({
      success: true,
      totalProduct: findproductlength.length,
      findproduct,
    });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//   Find Sample Products

export const GetSampleProducts = async (req, res) => {
  try {
    const { NumOfProducts, Categories } = req.query;

    let categoriesarr = Categories.trim().split(",");
    let products = [];
    categoriesarr.forEach(async (item) => {
      let findproduct = await ProductModel.find({ category: item }).limit(
        NumOfProducts
      );

      products.push(findproduct);
    });

    setTimeout(() => {
      return res.status(200).json({ success: true, findproduct: products });
    }, 2000);
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};


export const GetAllProdductName = async (req, res) => {
  try {
    const findproduct = await ProductModel.find();

    if (findproduct.length > 0) {
      for (let i = 0; i < findproduct.length; i++) {
        let user = await UserModel.findById(findproduct[i].createproductuser);
        findproduct[i].createproductuser = user;
      }
    }
 

    return res.status(200).json({ findAllProduct: findproduct, success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

//  export DeleteProduct  (Admin and Owner Routes)
export const deleteProduct = async (req, res) => {
  try {
    let productId = req.params.id;

    // cloudinary  will added be later

    let findproduct = await ProductModel.findById(productId);
    if (!findproduct) {
      let message = "This Product is not Found";
      return SendError(res, 404, false, message, null);
    }
    findproduct.images.forEach(async (item) => {
      await cloudinary.v2.uploader.destroy(item.public_id);
    });

    let result = await ProductModel.findByIdAndDelete(productId);
    if (!result) {
      let message = "This Product is not Deleted";
      return SendError(res, 500, false, message, null);
    }
    let message = "This Product Deleted Successfully";
    res.status(200).json({ success: true, message });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

// Get  and Highest PRoduct Price and LowestProduct price
export const GetHighest_And_Lowest_PRoductPrice = async (req, res) => {
  try {
    const HighestPriceProduct = await ProductModel.findOne().sort({
      price: -1,
    });
    const LowestPriceProduct = await ProductModel.findOne().sort({ price: 1 });

    if (HighestPriceProduct && LowestPriceProduct) {
      return res.status(200).json({
        success: true,
        HighestPriceProduct: HighestPriceProduct.price,
        LowestPriceProduct: LowestPriceProduct.price,
      });
    } else {
      let error = "Highest and Lowest Price product is not found";
      return res.status(500).json({
        success: false,
        HighestPriceProduct: 0,
        LowestPriceProduct: 0,
        error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      HighestPriceProduct: 0,
      LowestPriceProduct: 0,
      error: error.message,
    });
  }
};

//  Get All Products Admin and Owner Routes
export const GetAllProductsByAdminandOwner = async (req, res) => {
  try {
    const findproduct = await ProductModel.find();

    let totalProduct = findproduct.length;
    return res.status(200).json({ success: true, totalProduct, findproduct });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};
//  Update product AdminAnd Owner Routes
export const UpddteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    req.body.createproductuser = req.user.id;
    let productimages = [];
    let findproduct = await ProductModel.findById(id);
    if (!findproduct) {
      let message = "This Product is not find";
      return SendError(res, 404, false, message, null);
    }

    if (req.files) {
      if (req.files["images[]"]) {
        findproduct.images.forEach(async (item) => {
          await cloudinary.v2.uploader.destroy(item.public_id);
        });

        if (req.files["images[]"].length == undefined) {
          productimages.push(req.files["images[]"].tempFilePath);
        } else {
          productimages = req.files["images[]"].map((imagedata) => {
            return imagedata.tempFilePath;
          });
        }

        let imageLink = [];

        for (let i = 0; i < productimages.length; i++) {
          const productClound = await cloudinary.v2.uploader.upload(
            productimages[i],
            { folder: "MyStore_Product" }
          );

          imageLink.push({
            public_id: productClound.public_id,
            url: productClound.url,
          });
        }

        req.body.images = imageLink;
      }
    }

    //    let findUpdateproduct=  await findproduct.save()

    let findUpdateproduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!findUpdateproduct) {
      let message = "This Product is not Not Update";
      return SendError(res, 500, false, message, null);
    }
    let message = "This Product is Update Successfully";
    return res.status(200).json({ success: true, message });
  } catch (error) {
    // return SendError(res, 500, false, null, error)
    if (!error.message) {
      return SendError(res, 400, false, error, null);
    }
    return SendError(res, 500, false, null, error);
  }
};

//   Get Single Product by Admin
export const GetSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let findproduct = await ProductModel.findById(id);
    // return SendError(res, 500, false, null, error)

    if (!findproduct) {
      let message = "This Product is not find";
      return SendError(res, 404, false, message, null);
    }
    res.status(200).json({ success: true, findproduct });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};
//   Review Session

//    New Review is Create and Old Review is Updated
export const CreateReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    let reviewobj = {
      createreviewuser: req.user._id,
      createreviewname: req.user.name,
      rating: Number(rating),
      comment: comment,
    };

    let findproduct = await ProductModel.findById(productId);

    if (!findproduct) {
      let message = "This Product is not Found";
      return SendError(res, 404, false, message, null);
    }

    let isReviewed = findproduct.createreviews.find((item) => {
      return String(item.createreviewuser) === String(req.user._id);
    });
    if (isReviewed) {
      findproduct.createreviews.forEach((item) => {
        if (String(item.createreviewuser) === String(req.user._id)) {
          (item.createreviewuser = req.user._id),
            (item.createreviewname = req.user.name),
            (item.rating = Number(rating));
          item.comment = comment;
        }
      });
    } else {
      findproduct.createreviews.push(reviewobj);
    }

    //  Set Number of Reviews
    findproduct.numOfReviews = findproduct.createreviews.length;

    //  Set Reating Avargae
    let totalrating = 0;
    let totalratinglength = findproduct.createreviews.length;
    findproduct.createreviews.forEach((element, index) => {
      totalrating = totalrating + element.rating;
    });
    let allratingavg = totalrating / totalratinglength;

    // let includedecimal = String(allratingavg).includes('.')

    // if (includedecimal) {
    //     allratingavg = Number(`${Math.floor(allratingavg)}.${Math.ceil(allratingavg)}`)
    // }

    findproduct.allratingsAvg = allratingavg;
    let product = await findproduct.save();
    if (!product) {
      let message = "Review not Created";
      return SendError(res, 500, false, message, null);
    }
    let message = "Review Create Successfully";
    res.status(201).json({ success: true, message, product });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//  Get All Review in One Product
export const GetAllReviewInSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const findproduct = await ProductModel.findById(productId);

    if (!findproduct) {
      let message = "Product not Found";
      return SendError(res, 404, false, message, null);
    }

    return res
      .status(200)
      .json({ getallreviews: findproduct.createreviews, success: true });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

// Delete Reviews and   Update All Reviews Rating Avrage  and Number of review  (Admin and owner Routes )

export const DeleteReviewsByAdminAndOwner = async (req, res) => {
  try {
    const { ProductId, ReviewId } = req.query;

    let findproduct = await ProductModel.findById(ProductId);
    if (!findproduct) {
      let message = "Product is not Found";
      return SendError(res, 404, false, message, null);
    }

    let reviews = findproduct.createreviews.filter((item) => {
      return String(item._id) !== String(ReviewId);
    });

    if (findproduct.createreviews.length === reviews.length) {
      let message = "Review Id is not Found";
      return SendError(res, 404, false, message, null);
    }

    findproduct.createreviews = reviews;

    //  Set Number of Reviews
    findproduct.numOfReviews = findproduct.createreviews.length;

    //  Set Reating Avargae

    let totalrating = 0;

    let totalratinglength = findproduct.createreviews.length;
    findproduct.createreviews.forEach((element, index) => {
      totalrating = totalrating + element.rating;
    });

    let allratingavg = totalrating / totalratinglength;
    let includedecimal = String(allratingavg).includes(".");

    if (includedecimal) {
      allratingavg = Number(
        `${Math.floor(allratingavg)}.${Math.ceil(allratingavg)}`
      );
    }

    if (findproduct.createreviews.length == 0) {
      allratingavg = 0;
    }
    findproduct.allratingsAvg = allratingavg;

    let product = await findproduct.save();
    let message = "Product Review  Deleted Successfully";
    return res.status(200).json({ success: true, message });
  } catch (error) {
    return SendError(res, 500, false, null, error);
  }
};

//  Test Again The Delete Review Function
