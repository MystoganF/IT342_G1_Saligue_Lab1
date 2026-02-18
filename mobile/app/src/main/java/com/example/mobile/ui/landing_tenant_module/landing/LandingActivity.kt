package com.example.mobile.ui.landing_tenant_module.landing

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.mobile.R
import com.example.mobile.ui.login_module.login.LoginActivity
import com.example.mobile.ui.landing_tenant_module.landing.LandingActivity
import com.example.mobile.ui.landing_tenant_module.profile.ProfileActivity
import com.example.mobile.utils.SessionManager
import com.google.android.material.bottomnavigation.BottomNavigationView

class LandingActivity : AppCompatActivity() {

    private lateinit var getStartedBtn: Button
    private lateinit var bottomNav: BottomNavigationView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val session = SessionManager(this)

        if (!session.isLoggedIn()) {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
            return
        }

        setContentView(R.layout.activity_landing)

        getStartedBtn = findViewById(R.id.getStartedBtn)
        bottomNav = findViewById(R.id.bottomNav)

        setupButtons()
        setupBottomNav()
        setupFeatures()
    }

    private fun setupButtons() {

        getStartedBtn.setOnClickListener {
            Toast.makeText(this, "Let's get started!", Toast.LENGTH_SHORT).show()
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }

    private fun setupBottomNav() {

        bottomNav.selectedItemId = R.id.nav_home

        bottomNav.setOnItemSelectedListener {

            when (it.itemId) {

                R.id.nav_home -> true

                R.id.nav_properties -> {
                    Toast.makeText(this, "Login to access properties", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(this, LandingActivity::class.java))
                    true
                }

                R.id.nav_messages -> {
                    Toast.makeText(this, "Login to view messages", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(this, LandingActivity::class.java))
                    true
                }

                R.id.nav_profile -> {
                    Toast.makeText(this, "Login to view profile", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(this, ProfileActivity::class.java))
                    true
                }

                else -> false
            }
        }
    }

    private fun setupFeatures() {

        setFeature(R.id.feature1,
            "List Your Properties",
            "Post boarding houses, apartments, or condos and make them visible to potential tenants.")

        setFeature(R.id.feature2,
            "Manage Rentals Easily",
            "Track occupancy, tenants, and property details in one organized system.")

        setFeature(R.id.feature3,
            "Connect With Tenants",
            "Allow renters to discover your property and communicate through the platform.")

        setFeature(R.id.feature4,
            "All-in-One Platform",
            "Everything you need to manage rentals — no paperwork, no scattered messages.")
    }

    private fun setFeature(id: Int, title: String, desc: String) {

        val view: View = findViewById(id)

        val titleTxt = view.findViewById<TextView>(R.id.featureTitle)
        val descTxt = view.findViewById<TextView>(R.id.featureDesc)

        titleTxt.text = title
        descTxt.text = desc
    }
}
