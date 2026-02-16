package com.example.mobile.data.remote.api
import MessageResponse
import RegisterRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {

    @POST("/api/auth/register")
    suspend fun register(
        @Body request: RegisterRequest
    ): Response<MessageResponse>
}
