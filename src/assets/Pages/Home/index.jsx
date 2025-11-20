import React, { useEffect, useState } from "react";
import "react-bootstrap"
import "../../vendor/bootstrap-icons/bootstrap-icons.css";
import "../../vendor/bootstrap/css/bootstrap.min.css"
import "../../vendor/bootstrap/css/bootstrap-grid.css"

import "../../vendor/aos/aos.css";
import "../../vendor/glightbox/css/glightbox.min.css";
import "../../vendor/swiper/swiper-bundle.min.css"
import "./home.css";
import "../../../App.css";
import { favicon, KIPLogo, LogoGenbi, ScholarshipLogo, ScholarshipBanner } from "../../img";
import { Link } from "react-router-dom";
import AnnouncementList from "./ListPengumuman";
import apiClient from "../../../api/apiClient";



function Home() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/announcement/public");
        const result = response.data?.output_schema?.result || []; // ambil array dari sini
        setAnnouncements(result);
      } catch (error) {
        console.error("Gagal memuat pengumuman:", error);
        setAnnouncements([]); // fallback supaya tidak error map
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>Scholar Management System</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      {/* Favicons */}
      <link href={favicon} rel="icon" />
      <link href={favicon} rel="apple-touch-icon" />
      {/* Fonts */}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap" rel="stylesheet"></link>

      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">
                  Scholarship Management System
                </h1>
                <p data-aos="fade-up" data-aos-delay={100}>
                  Universitas Klabat
                </p>
              </div>
            <div
                className="col-lg-6 order-1 order-lg-2 hero-img"
                data-aos="zoom-out"
              >
                <img
                  src={ScholarshipLogo}
                  className="img-fluid animated"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/* /Hero Section */}
        {/* About Section */}
        <section id="about" className="about section">
          <div className="container" data-aos="fade-up">
            <div className="row gx-0">
              <div
                className="col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="content">
                  <h2>
                    Apa itu Sistem Informasi Manajemen Beasiswa?
                  </h2>
                  <p>
                    Sistem Informasi Manajemen Beasiswa adalah sistem berbasis teknologi yang dirancang untuk mengelola seluruh proses terkait beasiswa, mulai dari pendaftaran, seleksi, hingga pencairan dana dan pelaporan.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-6 d-flex align-items-center"
                data-aos="zoom-out"
                data-aos-delay={200}
              >
                <img src={ScholarshipBanner} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>
        {/* /About Section */}
        {/* Values Section */}
        <section id="values" className="values section">
          <div className="container section-title" data-aos="fade-up">
            <p>
              Klik jenis beasiswa dibawah untuk masuk
            </p>
            <h2>Click for more Info <i class="bi bi-arrow-down"></i></h2>
          </div>
          <div className="card-container container">
            <div className="row gy-3 justify-content-center">
              <Link to="/beasiswa/kip" className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
                <div className="card">
                  <img src={KIPLogo} className="img-fluid" alt="" />
                  <h3>Kartu Indonesia Pintar <br />(KIP) Kuliah</h3>
                  <p>
                    (KIP) Kuliah adalah program bantuan biaya pendidikan yang disediakan oleh pemerintah Indonesia.
                  </p>
                </div>
              </Link>
              {/* End Card Item */}
              <Link className="col-lg-4" data-aos="fade-up" data-aos-delay={300} to="/beasiswa/genbi">
                <div className="card">
                  <img src={LogoGenbi} className="img-fluid" alt="" />
                  <h3>Generasi Baru Indonesia <br /> (GenBI)</h3>
                  <p>
                    Beasiswa GenBI adalah program beasiswa yang diselenggarakan oleh Bank Indonesia (BI).
                  </p>
                </div>
              </Link>
              {/* End Card Item */}
            </div>
          </div>
        </section>
        {/* /Values Section */}

        {/* Features Section */}
        <section id="features" className="features section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Jadwal</h2>
            <p>
              Jadwal Pendaftaran Beasiswa
              <br />
            </p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row gy-5">
              <div className="col-xl-6 d-flex">
                <div className="column align-self-center gy-4">
                  <div className="col-md-6" data-aos="fade-up" data-aos-delay={200}>
                    <div className="feature-box d-flex align-items-center ">
                      <table width={1300}>
                        <th width={500}><h3>KIP Kuliah</h3></th>
                        <th width={450}><h3>1 Maret - 31 Maret</h3></th>
                        <th width={200}><Link to="/beasiswa/kip"><i class="bi bi-info-circle"></i>Info</Link></th>
                        <th width={150}><Link to="/beasiswa/kip/form-pendaftaran">Daftar</Link></th>
                      </table>
                    </div>
                  </div>
                  {/* End Feature Item */}
                  <div className="col-md-6" data-aos="fade-up" data-aos-delay={300}>
                    <div className="feature-box d-flex align-items-center">
                      <table width={1300}>
                        <th width={500}><h3>GenBI</h3></th>
                        <th width={450}><h3>1 Maret - 31 Maret</h3></th>
                        <th width={200}><Link to="/beasiswa/genbi"><i class="bi bi-info-circle"></i>Info</Link></th>
                        <th width={150}><Link to="/beasiswa/genbi/form-pendaftaran">Daftar</Link></th>
                      </table>
                    </div>
                  </div>
                  {/* End Feature Item */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Features Section */}
        
        {/* Services Section */}
        <section id="services" className="services section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
         
            <p>
              Pengumuman
              <br />
            </p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row gy-4">
              <AnnouncementList announcements={announcements}/>
              {/* End Service Item */}
            </div>
          </div>
        </section>
        {/* /Services Section */}

        {/* Contact Section */}
        <section id="contact" className="contact section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Contact</h2>
            <p>Contact Us</p>
          </div>
          {/* End Section Title */}
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay={200}>
                      <i className="bi bi-geo-alt" />
                      <h3>Address</h3>
                        <p>Jl. Arnold Mononutu</p>
                        <p>Airmadidi, Minahasa Utara</p>
                        <p>Sulawesi Utara 95371</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay={300}>
                      <i className="bi bi-telephone" />
                      <h3>Call Us</h3>
                      <p>+62 822 5186 7733</p>
                      <p>+62 878 1498 3589</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay={400}>
                      <i className="bi bi-envelope" />
                      <h3>Email Us</h3>
                      <p>s22110530@student.unklab.ac.id</p>
                      <p>s22110246@student.unklab.ac.id</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay={500}>
                      <i className="bi bi-clock" />
                      <h3>Jam Buka</h3>
                      <p>Senin - Jumat</p>
                      <p>8:00AM - 05:00PM</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                </div>
              </div>
              <div className="col-lg-6">
                <form
                  action="forms/contact.php"
                  method="post"
                  className="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required=""
                      />
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        required=""
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Subject"
                        required=""
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control"
                        name="message"
                        rows={6}
                        placeholder="Message"
                        required=""
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message" />
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>
                      <button type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
              {/* End Contact Form */}
            </div>
          </div>
        </section>
        {/* /Contact Section */}
      </main>
      <footer id="footer" className="footer">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="App.js" className="d-flex align-items-center">
                <span className="sitename">Universitas Klabat</span>
              </a>
              <div className="footer-contact pt-3">
                <p>Jl. Arnold Mononutuh</p>
                <p>Airmadidi, Minahasa Utara</p>
                <p>Sulawesi Utara 95371</p>
                <p className="mt-3">
                  <strong>Phone:</strong> <span> +62431 891035</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>kemahasiswaan@unklab.ac.id</span>
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right" /> <a href="#">Home</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right" /> <a href="#">About us</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right" /> <a href="#">Services</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right" />{" "}
                  <a href="#">Terms of service</a>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-4 col-md-12">
              <h4>Follow Us</h4>
              <p>
                Cras fermentum odio eu feugiat lide par naso tierra videa magna
                derita valies
              </p>
              <div className="social-links d-flex">
                <a href="">
                  <i className="bi bi-twitter-x" />
                </a>
                <a href="">
                  <i className="bi bi-facebook" />
                </a>
                <a href="https://www.instagram.com/loveniamendes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                  <i className="bi bi-instagram"/>
                </a>
                <a href="">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">Universitas Klabat</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
        </div>
        <a href="“https://themewagon.com"></a>
      </footer>
      <a href="“https://themewagon.com">{/* Scroll Top */}</a>
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
      {/* Vendor JS Files */}
      {/* Main JS File */}
    </>

  );
}

export default Home;
