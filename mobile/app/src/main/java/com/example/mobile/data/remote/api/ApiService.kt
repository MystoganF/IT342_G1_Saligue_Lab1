package com.example.mobile.data.remote.api

import MessageResponse
import RegisterRequest
import com.example.mobile.data.model.request.LoginRequest
import com.example.mobile.data.model.response.LoginResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT

interface ApiService {

    @POST("/api/auth/register")
    suspend fun register(
        @Body request: RegisterRequest
    ): Response<MessageResponse>

    @POST("/api/auth/login")
    suspend fun login(
        @Body request: LoginRequest
    ): Response<LoginResponse>

    // 🔐 PROTECTED ROUTES — NO HEADER ANYMORE
    @GET("/api/users/me")
    suspend fun getProfile(): Response<Map<String, String>>

    @PUT("/api/users/me")
    suspend fun updateProfile(
        @Body body: Map<String, String>
    ): Response<Map<String, String>>

    @POST("/api/users/change-password")
    suspend fun changePassword(
        @Body body: Map<String, String>
    ): Response<Map<String, String>>
}
