package com.example.mobile.data.repository

import RegisterRequest
import com.example.mobile.data.model.request.LoginRequest
import com.example.mobile.data.model.response.LoginResponse
import com.example.mobile.data.remote.network.RetrofitInstance

class AuthRepository {

    suspend fun register(
        username: String,
        email: String,
        phone: String,
        password: String
    ): Result<String> {

        return try {

            val response = RetrofitInstance.api.register(
                RegisterRequest(username, email, phone, password)
            )

            if (response.isSuccessful) {
                Result.success(response.body()?.message ?: "Registered successfully")
            } else {
                Result.failure(
                    Exception(response.errorBody()?.string() ?: "Registration failed")
                )
            }

        } catch (e: Exception) {
            Result.failure(Exception("Cannot connect to server"))
        }
    }

    suspend fun login(
        username: String,
        password: String
    ): Result<LoginResponse> {

        return try {

            val response = RetrofitInstance.api.login(
                LoginRequest(username, password)
            )

            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception(response.errorBody()?.string() ?: "Login failed"))
            }

        } catch (e: Exception) {
            Result.failure(Exception("Cannot connect to server"))
        }
    }

}
