import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

// Create new user
const createNewUser = async (data: any): Promise<string> => {
  try {
    const hashPassword = await hashUserPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === "1" || data.gender === true ? true : false,
      roleId: data.roleId,
    });
    return "OK create a new user successfully";
  } catch (e) {
    throw e;
  }
};

let hashUserPassword = (password: string) => {
  return bcrypt.hashSync(password, salt);
}

let getAllUser =async () => {
    try {
    const users = await db.User.findAll({ raw: true });
    return users;
  } catch (e) {
    throw e;
  }
}

let getUserInfoById =async (userId: string) => {
    try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
    return user || {};
  } catch (e) {
    throw e;
  }
}

let updateUser =async (data: any) => {
   try {
    const user = await db.User.findOne({ where: { id: data.id } });
    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      await user.save();

      const allUsers = await db.User.findAll({ raw: true });
      return allUsers;
    } else {
      return [];
    }
  } catch (e) {
    throw e;
  }
}

let deleteUserById =async (userId: string) => {
    try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (user) await user.destroy();
  } catch (e) {
    throw e;
  }
}

export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById,
};