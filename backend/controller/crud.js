const passport = require("passport");
const validator = require("validator");
const User = require("../model/User");

module.exports = {
    like: async (req, res, next) => {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id: req.body.user},
                {
                    $push: { likes: req.body.id},
                }
            )
            //conosle.log(cool)
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
              return res.status(200).json(updateUser.likes);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    unlike: async (req, res, next) => {
        try{
            const updateUser = await User.findOneAndUpdate(
                {_id: req.body.user},
                {
                    $pull: { likes: req.body.id},
                }
            )
            //conosle.log(cool)
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
              return res.status(200).json(updateUser.likes);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}