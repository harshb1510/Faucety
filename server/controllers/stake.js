const User = require("../models/userModel.js");
const StakingPool = require("../models/nftStake.js");

const createStake = async (req, res) => {
  try {
    const { creator, totalStakedAmount, endTime, cid, transaction } = req.body;

    const user = await User.findOne({ userName: creator });
    if (!user) {
      return res.status(404).json({ message: "Creator not found" });
    }
    
    const endTimeMilliseconds = Date.parse(endTime);

    const stakingPool = new StakingPool({
      creator: user._id,
      totalStakedAmount,
      endTime: endTimeMilliseconds, 
      cid,
      transaction,
    });

    await stakingPool.save();

    return res.status(201).json(stakingPool);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const getStakePools = async (req, res) => {
  try {
    const stakingPools = await StakingPool.find().populate(
      "creator",
      "userName"
    );

    return res.status(200).json(stakingPools);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getStakePoolById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await StakingPool.findById(id);

    if (!pool) {
      return res.status(404).json({ message: 'Pool not found' });
    }

    return res.status(200).json(pool);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const joinPool = async (req, res) => {
  try {
    const { userName, amount } = req.body;
    const poolId = req.params.id;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stakingPool = await StakingPool.findById(poolId);
    if (!stakingPool) {
      return res.status(404).json({ message: 'Staking pool not found' });
    }

    
    const parsedAmount = parseInt(amount);

    const minimumAmountToStake = 10;
    if (parsedAmount < minimumAmountToStake) {
      return res.status(400).json({ message: `Minimum amount to stake is ${minimumAmountToStake}` });
    }

    if (user.wallet < parsedAmount) {
      return res.status(400).json({ message: 'Insufficient balance in wallet' });
    }

    if (stakingPool.participants.includes(user.userName)) {
      return res.status(400).json({ message: 'User is already a participant in this staking pool' });
    }

    user.wallet -= parsedAmount;
    user.staked += parsedAmount;
    await user.save();

    stakingPool.participants.push(user.userName);
    await stakingPool.save();

    return res.status(200).json({ message: 'User joined the staking pool' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};




const withdrawStake = async (req, res) => {
  try {
    const { userName } = req.body;
    const poolId = req.params.poolId;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const stakingPool = await StakingPool.findById(poolId);
    if (!stakingPool) {
      return res.status(404).json({ message: "Staking pool not found" });
    }

    if (!stakingPool.participants.includes(userName)) {
      return res
        .status(400)
        .json({ message: "User is not a participant in the staking pool" });
    }

    const userStakedAmount =
      stakingPool.totalStakedAmount / stakingPool.participants.length;

    user.wallet += userStakedAmount;
    user.staked -= userStakedAmount;
    await user.save();

    stakingPool.participants = stakingPool.participants.filter(
      (participant) => participant !== userName
    );
    await stakingPool.save();

    return res.status(200).json({ message: "Stakes withdrawn successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const selectWinner = async (req, res) => {
  try {
    const poolId = req.params.id;
    const stakingPool = await StakingPool.findById(poolId);

    if (!stakingPool) {
      return res.status(404).json({ message: "Staking pool not found" });
    }
    const currentTime = Date.now();
    
    if (currentTime > stakingPool.endTime) {
      return res
        .status(400)
        .json({ message: "Staking pool end time has not passed yet" });
    }

    const winnerIndex = Math.floor(
      Math.random() * stakingPool.participants.length
    );

    const winnerUsername = stakingPool.participants[winnerIndex];

    const winnerUser = await User.findOne({ userName: winnerUsername });
    if (!winnerUser) {
      return res.status(404).json({ message: "Winner user not found" });
    }

    winnerUser.wallet += stakingPool.totalStakedAmount;
    await winnerUser.save();

    // Assign the winner's ObjectId to the winner field
    stakingPool.winner = winnerUser._id;
    await stakingPool.save();

    return res.status(200).json({
      message: "Winner selected successfully",
      winner: winnerUsername,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createStake,
  getStakePools,
  joinPool,
  withdrawStake,
  selectWinner,
  getStakePoolById
};
