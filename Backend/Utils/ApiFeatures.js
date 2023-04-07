import ProductModel from "../Model/ProductModel.js"


class ApiFeture {
    constructor(querry, ProductModel) {
        this.querry = querry
        this.ProductModel = ProductModel
    }
    //   Set Result perpage Product 







    //    Filter Product  in Price 
    FilterProductinPrice() {


        const copyquerry = { ...this.querry }
        const deletequery = ["pagenumber", "keyword", 'categories']
        deletequery.forEach((key) => {
            delete copyquerry[key]
        })
       
        this.ProductModel = this.ProductModel.find(copyquerry)


        return this


    }

    //    Find Product in kewyWords 
    SearchProduct() {
        if (this.querry.keyword) {
            let regex = /(^[a-zA-z]+$)/
            let search = {
                name: {
                    $regex: this.querry.keyword,
                    $options: 'i',
                }

            }


             
            this.ProductModel = this.ProductModel.find(search)
        }

        return this
    }


    productperpage(resultperpage) {


        let currentpage = this.querry.pagenumber || 1
        let skip = resultperpage * (currentpage - 1)
        this.ProductModel = this.ProductModel.find().limit(resultperpage).skip(skip)


        return this

    }



}
export default ApiFeture