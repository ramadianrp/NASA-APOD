const { Asset } = require("../models");
const { Op } = require("sequelize");

class HomeController {

    static async showAssetEntity(req, res, next) {
        try {
            const product = await Asset.findAll();
            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async addMainEntity(req, res, next) {
        try {
            const { name, desc, dateFound, userId } =
                req.body;
            let assets = await Asset.create({
                name,
                desc,
                dateFound,
                userId
            });

            res
                .status(201)
                .json({ message: "New Asset has been Created", assets });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async editAssetById(req, res, next) {
        try {
            const { id } = req.params;
            const findMainEntity = await Asset.findByPk(id);
      
            if (!findMainEntity) {
              throw { name: "NotFound", id };
            }
      
            const {
              name,
              desc,
              dateFound,
              userId
            } = req.body;
      
            const editEnt = await findMainEntity.update({
                name,
                desc,
                dateFound,
                userId
            });

            console.log(editEnt);

            res
                .status(200)
                .json({ message: `Asset ${editEnt.name} with id ${id} updated`});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteAssetById(req, res, next) {
        try {
            const assetId = +req.params.id;
            const asset = await Asset.findByPk(assetId);

            if (!asset) {
                throw {
                    name: "NotFound",
                    assetId,
                };
            }

            const delEnti = await Asset.destroy({
                where: {
                    id: assetId,
                },
            });
            res.status(200).json({ message: `Asset deleted` });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = HomeController;
