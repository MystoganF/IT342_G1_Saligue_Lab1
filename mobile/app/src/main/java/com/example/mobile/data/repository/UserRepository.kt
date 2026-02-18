package com.example.mobile.data.repository

import android.content.Context
import com.example.mobile.data.remote.network.RetrofitInstance

class UserRepository(context: Context) {

    private val api = RetrofitInstance.create(context)

    suspend fun getProfile() =
        api.getProfile()

    suspend fun updateProfile(username: String, email: String, phone: String) =
        api.updateProfile(
            mapOf(
                "username" to username,
                "email" to email,
                "phoneNumber" to phone
            )
        )

    suspend fun changePassword(old: String, new: String) =
        api.changePassword(
            mapOf(
                "oldPassword" to old,
                "newPassword" to new
            )
        )
}
