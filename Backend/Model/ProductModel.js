import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter product Name"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please Enter product Description"],

    },
    price: {
        type: Number,
        trim: true,
        required: [true, "Please Enter Product Price"],

    },

    allratingsAvg: {
        type: Number,
        trim: true,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                trim: true,
                required: true
            },
            url: {
                type: String,
                trim: true,
                required: true
            }

        }
    ],
    category: {
        type: String,
        trim: true,
        required: [true, "Please Enter Product Category"]
    },

    stock: {
        type: Number,
        trim: true,
        required: [true, "Plase Enter Product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },

    numOfReviews: {
        type: Number,
        trim: true,
        default: 0

    },
    createreviews: [
        {
            createreviewuser: {
                type: mongoose.Schema.ObjectId,
                trim: true,
                ref: "Users",
                required: true,
            },
            createreviewname: {
                type: String,
                trim: true,
                required: true,
            },
            rating: {
                type: Number,
                trim: true,
                required: true,
                max: 5

            },
            comment: {
                type: String,
                trim: true,
                required: true,
            }

        }
    ],
    createproductuser: {
        type: mongoose.Schema.ObjectId,
        trim: true,
        ref: "Users",
        required: true
    },
    createAt: {
        type: Date,
        trim: true,
        default: Date.now
    }
})


const ProductModel = mongoose.model('Products', productSchema)

export default ProductModel