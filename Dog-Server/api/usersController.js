const CurrentUser = require('../models/UserModel');
const CurrentFavorite = require('../models/FavoriteModel');
//----------user controllers---------------
exports.createUser = async function (req, res) {
    try {
        const name = req.body;
        const newUser = await CurrentUser.create(name);
        res.status(201).json({
            status: "success",
            data: newUser
        })
    }
    catch (e) {
        res.status(400).json({
            status: "fail",
            message: "error:😱" + e
        })
    }
};
exports.getAll = async function (req, res) {
    try {
        const users = await CurrentUser.find();
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "error:😱" + e
        });
    }
};
exports.getById = async (req, res) => {
    try {
        const user = await CurrentUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        res.status(200).json({ status: 'success', data: user });
    } catch (e) {
        res.status(400).json({ status: 'fail', message: e.message });
    }
}
exports.updateName = async (req, res) => {
    try {
        const user = await CurrentUser.findByIdAndUpdate(req.params.id,
            { $set: { name: req.body.name } },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        res.status(200).json({ status: 'success', data: user });
    } catch (e) {
        res.status(400).json({ status: 'fail', message: e.message });
    }
};
exports.updateProfile = async (req, res) => {
    try {
        const favoriteCount = await CurrentFavorite.countDocuments({ _id: req.body.profilePic, user: req.params.id });
        if (!favoriteCount) {
            return res.status(404).json({ status: 'fail', message: 'User didn\'t like this picture' });
        }
        const user = await CurrentUser.findByIdAndUpdate(req.params.id,
            { $set: { profilePic: req.body.profilePic } },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        res.status(200).json({ status: 'success', data: user });
    } catch (e) {
        res.status(400).json({ status: 'fail', message: e.message });
    }
};
exports.deleteUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await CurrentUser.deleteOne({ _id: id });
        if (!result.deletedCount) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        await CurrentFavorite.deleteMany({ user: id });
        res.status(200).json({ status: 'success', data: null });
    } catch (e) {
        res.status(400).json({ status: 'fail', message: e.message });
    }
};
exports.deleteProfile = async (req, res) => {
    try {
        const user = await CurrentUser.updateOne({ _id: req.params.id }, { $unset: { profilePic: 1 } });
        if (!user.matchedCount) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        if (!user.modifiedCount) {
            return res.status(400).json({ status: 'fail', message: 'User didn\'t have a profile picture' });
        }
        res.status(200).json({ status: 'success', data: null });
    } catch (e) {
        res.status(400).json({ status: 'fail', message: e.message });
    }
}
//-------------favorites controllers--------
// exports.addFavorite =  async (req, res)=>{
//     try {
//         const userCount = await CurrentUser.countDocuments({_id: req.params.id});
//         if (!userCount){
//             return res.status(404).json({status: 'fail', message: 'User not found'});
//         }
//         const favorite = new CurrentFavorite({imgSrc: req.body.imgSrc, user: req.params.id});
//         await favorite.save();
//         res.status(201).json({status: 'success', data: favorite});
//     } catch(e){
//         res.status(400).json({status: 'fail', message: e.message});
//     }
// };
exports.addFavorite = async (req, res) => {
    try {
        const userCount = await CurrentUser.countDocuments({ _id: req.params.id });
        if (!userCount) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        if (!req.body.imgSrc) {
            return res.status(400).json({ status: 'fail', message: "Missing 'imgSrc' in request body" });
        }
        const favorite = await CurrentFavorite.findOne({ imgSrc: req.body.imgSrc, user: req.params.id })
        if (favorite) {
            console.log(favorite);
            
            return res.status(400).json({ status: 'fail', message: "favorite duplicate" });
        }
        const newFavorite = new CurrentFavorite({ imgSrc: req.body.imgSrc, user: req.params.id });
        await newFavorite.save();
        res.status(201).json({ status: 'success', data: newFavorite });
    } catch (e) {
        res.status(400).json({ status: 'fail', message: e.message });
    }
};
exports.getAllFavorites = async (req, res) => {
    const query = { user: req.params.id };
    if (req.query.name) {
        query.name = { $regex: req.query.name };
    }
    const options = {};
    if (req.query.limit) {
        options.limit = +req.query.limit;
    }
    if (req.query.skip) {
        options.skip = +req.query.skip;
    }
    try {
        let favorites = await CurrentFavorite.find(query, {}, options);
        res.status(200).json({ status: 'success', data: favorites });
    } catch (e) {
        res.status(400).json({ status: 'fail', message: e.message });
    }
}
exports.changeFavoriteName = async (req, res) => {
    try {
        const favorite = await CurrentFavorite.findByIdAndUpdate(
            req.params.favId,
            { $set: { name: req.body.name } },
            { new: true, runValidators: true }
        );
        if (!favorite) {
            return res.status(404).json({ status: 'fail', message: 'Favorite not found' });
        }
        res.status(200).json({ status: 'success', message: favorite });
    } catch (e) {
        res.status(400).json({ status: 'fail', message: e.message });
    }
};
exports.deleteFavoriteById = async (req, res) => {
    try {
        const result = await CurrentFavorite.deleteOne({ _id: req.params.favId, user: req.params.id });
        if (!result.deletedCount) {
            return res.status(404).json({ status: 'fail', message: 'Picture not found' });
        }
        await CurrentUser.updateOne(
            { _id: req.params.id, profilePic: req.params.favId },
            { $unset: { profilePic: 1 } }
        );
        res.status(200).json({ status: 'success', message: null });
    } catch (e) {
        res.status(400).json({ status: 'fail', message: e.message });
    }
};