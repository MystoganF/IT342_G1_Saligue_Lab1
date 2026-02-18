package com.example.mobile.data.remote.network

import android.content.Context
import android.content.Intent
import com.example.mobile.ui.login_module.login.LoginActivity
import com.example.mobile.utils.SessionManager
import okhttp3.Interceptor
import okhttp3.Response

class UnauthorizedInterceptor(private val context: Context) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {

        val response = chain.proceed(chain.request())

        if (response.code == 401) {

            val session = SessionManager(context)
            session.logout()

            val intent = Intent(context, LoginActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            context.startActivity(intent)
        }

        return response
    }
}
