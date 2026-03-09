const fs = require('fs');
let html = fs.readFileSync('c:\\laragon\\www\\studiomitra\\index.html', 'utf8');

const replacement = `    <!-- Top Studios Section -->
    <section class="top-studios-section py-5 position-relative bg-light overflow-hidden">
        <div class="container bg-transparent p-0 position-relative z-1">
            <div class="text-center mb-5">
                <h2 class="section-heading">Popular & Top Rated Studios</h2>
                <p class="text-muted text-dark fs-5">Discover the best photography studios in StudioMitra</p>
            </div>

            <div id="studiosCarousel" class="carousel slide pb-5 p-md-3" data-bs-ride="carousel">
                <div class="carousel-inner pb-4">
                    <!-- Slide 1 -->
                    <div class="carousel-item active">
                        <div class="row g-4 px-2">
                            <!-- Studio 1 -->
                            <div class="col-md-4">
                                <div class="studio-card glassmorphism p-4 h-100 text-center transition-hover rounded-4 d-flex flex-column" style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);">
                                    <div class="studio-logo mb-4 position-relative d-inline-block">
                                        <img src="images/ai_portrait.png"
                                            alt="Studio Logo" class="rounded-circle shadow-sm"
                                            style="width: 100px; height: 100px; object-fit: cover; border: 4px solid #fff;">
                                    </div>
                                    <h4 class="studio-name fw-bold mb-1" style="color: #1e2a3b;">Candid Creators</h4>
                                    <div class="studio-ratings text-warning mb-3">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half-stroke"></i>
                                        <span class="text-muted ms-1 small fw-medium">(4.8)</span>
                                    </div>
                                    <p class="studio-description text-muted small mb-4 px-2">Specializing in capturing authentic moments, wedding portraits, and cinematic videos.</p>
                                    <div class="mt-auto">
                                        <a href="#" class="btn btn-register rounded-pill w-100 py-2 fw-semibold text-white" style="background: linear-gradient(135deg, #cb6f09, #aa4502); border: none;">View Portfolio</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Studio 2 -->
                            <div class="col-md-4 d-none d-md-block">
                                <div class="studio-card glassmorphism p-4 h-100 text-center transition-hover rounded-4 d-flex flex-column" style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);">
                                    <div class="studio-logo mb-4 position-relative d-inline-block">
                                        <img src="images/ai_portrait.png"
                                            alt="Studio Logo" class="rounded-circle shadow-sm"
                                            style="width: 100px; height: 100px; object-fit: cover; border: 4px solid #fff;">
                                    </div>
                                    <h4 class="studio-name fw-bold mb-1" style="color: #1e2a3b;">Lens & Light</h4>
                                    <div class="studio-ratings text-warning mb-3">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <span class="text-muted ms-1 small fw-medium">(5.0)</span>
                                    </div>
                                    <p class="studio-description text-muted small mb-4 px-2">Award-winning studio bringing your ideas to life through dynamic lighting and composition.</p>
                                    <div class="mt-auto">
                                        <a href="#" class="btn btn-register rounded-pill w-100 py-2 fw-semibold text-white" style="background: linear-gradient(135deg, #cb6f09, #aa4502); border: none;">View Portfolio</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Studio 3 -->
                            <div class="col-md-4 d-none d-md-block">
                                <div class="studio-card glassmorphism p-4 h-100 text-center transition-hover rounded-4 d-flex flex-column" style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);">
                                    <div class="studio-logo mb-4 position-relative d-inline-block">
                                        <img src="images/ai_portrait.png"
                                            alt="Studio Logo" class="rounded-circle shadow-sm"
                                            style="width: 100px; height: 100px; object-fit: cover; border: 4px solid #fff;">
                                    </div>
                                    <h4 class="studio-name fw-bold mb-1" style="color: #1e2a3b;">Memories By Max</h4>
                                    <div class="studio-ratings text-warning mb-3">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <span class="text-muted ms-1 small fw-medium">(4.2)</span>
                                    </div>
                                    <p class="studio-description text-muted small mb-4 px-2">Creative photography services tailored for family portraits and personal milestones.</p>
                                    <div class="mt-auto">
                                        <a href="#" class="btn btn-register rounded-pill w-100 py-2 fw-semibold text-white" style="background: linear-gradient(135deg, #cb6f09, #aa4502); border: none;">View Portfolio</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Slide 2 -->
                    <div class="carousel-item">
                        <div class="row g-4 px-2">
                            <!-- Studio 4 -->
                            <div class="col-md-4">
                                <div class="studio-card glassmorphism p-4 h-100 text-center transition-hover rounded-4 d-flex flex-column" style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);">
                                    <div class="studio-logo mb-4 position-relative d-inline-block">
                                        <img src="images/ai_portrait.png"
                                            alt="Studio Logo" class="rounded-circle shadow-sm"
                                            style="width: 100px; height: 100px; object-fit: cover; border: 4px solid #fff;">
                                    </div>
                                    <h4 class="studio-name fw-bold mb-1" style="color: #1e2a3b;">Pixel Perfect</h4>
                                    <div class="studio-ratings text-warning mb-3">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half-stroke"></i>
                                        <span class="text-muted ms-1 small fw-medium">(4.9)</span>
                                    </div>
                                    <p class="studio-description text-muted small mb-4 px-2">A premier photography studio focusing on high-end fashion and commercial brand stories.</p>
                                    <div class="mt-auto">
                                        <a href="#" class="btn btn-register rounded-pill w-100 py-2 fw-semibold text-white" style="background: linear-gradient(135deg, #cb6f09, #aa4502); border: none;">View Portfolio</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Studio 5 -->
                            <div class="col-md-4 d-none d-md-block">
                                <div class="studio-card glassmorphism p-4 h-100 text-center transition-hover rounded-4 d-flex flex-column" style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);">
                                    <div class="studio-logo mb-4 position-relative d-inline-block">
                                        <img src="images/ai_portrait.png"
                                            alt="Studio Logo" class="rounded-circle shadow-sm"
                                            style="width: 100px; height: 100px; object-fit: cover; border: 4px solid #fff;">
                                    </div>
                                    <h4 class="studio-name fw-bold mb-1" style="color: #1e2a3b;">Aperture Arts</h4>
                                    <div class="studio-ratings text-warning mb-3">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <span class="text-muted ms-1 small fw-medium">(5.0)</span>
                                    </div>
                                    <p class="studio-description text-muted small mb-4 px-2">Passionate storytellers using a blend of photojournalism and classic portraiture.</p>
                                    <div class="mt-auto">
                                        <a href="#" class="btn btn-register rounded-pill w-100 py-2 fw-semibold text-white" style="background: linear-gradient(135deg, #cb6f09, #aa4502); border: none;">View Portfolio</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Studio 6 -->
                            <div class="col-md-4 d-none d-md-block">
                                <div class="studio-card glassmorphism p-4 h-100 text-center transition-hover rounded-4 d-flex flex-column" style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);">
                                    <div class="studio-logo mb-4 position-relative d-inline-block">
                                        <img src="images/ai_portrait.png"
                                            alt="Studio Logo" class="rounded-circle shadow-sm"
                                            style="width: 100px; height: 100px; object-fit: cover; border: 4px solid #fff;">
                                    </div>
                                    <h4 class="studio-name fw-bold mb-1" style="color: #1e2a3b;">Golden Hour</h4>
                                    <div class="studio-ratings text-warning mb-3">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half-stroke"></i>
                                        <span class="text-muted ms-1 small fw-medium">(4.7)</span>
                                    </div>
                                    <p class="studio-description text-muted small mb-4 px-2">Capturing memories in the best light. Outdoor and destination photography experts.</p>
                                    <div class="mt-auto">
                                        <a href="#" class="btn btn-register rounded-pill w-100 py-2 fw-semibold text-white" style="background: linear-gradient(135deg, #cb6f09, #aa4502); border: none;">View Portfolio</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Controls -->
                <button class="carousel-control-prev" type="button" data-bs-target="#studiosCarousel"
                    data-bs-slide="prev" style="width: 50px; justify-content: flex-start; margin-left: -20px;">
                    <span class="bg-white rounded-circle shadow d-inline-flex justify-content-center align-items-center transition-hover"
                        style="width: 45px; height: 45px; color: #aa4502; border: 1px solid rgba(0,0,0,0.05);" aria-hidden="true">
                        <i class="fa-solid fa-chevron-left fs-5"></i>
                    </span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#studiosCarousel"
                    data-bs-slide="next" style="width: 50px; justify-content: flex-end; margin-right: -20px;">
                    <span class="bg-white rounded-circle shadow d-inline-flex justify-content-center align-items-center transition-hover"
                        style="width: 45px; height: 45px; color: #aa4502; border: 1px solid rgba(0,0,0,0.05);" aria-hidden="true">
                        <i class="fa-solid fa-chevron-right fs-5"></i>
                    </span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div class="row mt-5">
                <div class="col-12 text-center">
                    <div class="trust-mini d-flex align-items-center justify-content-center">
                        <div class="stars gold me-2 text-warning">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <span class="text-muted small">Trusted by Thousands of <span
                                class="fw-bold fst-italic">Customers</span></span>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

const startMarker = '    <!-- Top Studios Section -->';
const endMarker = '    </section>';
const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker, startIndex) + endMarker.length;

if (startIndex !== -1 && endIndex !== -1) {
    fs.writeFileSync('c:\\laragon\\www\\studiomitra\\index.html', html.substring(0, startIndex) + replacement + html.substring(endIndex));
    console.log("Success");
} else {
    console.log("Failed to find markers");
}
