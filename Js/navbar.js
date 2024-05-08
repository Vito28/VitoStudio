const navbar = `
    <div class="brand">
    <img src="../Image/Logo/web_design_studio.png" alt="logo">
    </div>
    <div class="wrapper-responsive">
    <div class="menu-list">
        <ul>
        <li><a href="../html/home.html">Home</a></li>
        <li><a href="../html/aboutUs.html">About Us</a></li>
        <li><a href="../html/portofolio.html">Portofolio</a></li>
        <li><a href="../html/contact.html">Contact</a></li>
        </ul>
        <div class="null"></div>
    </div>
    <div class="form_auth">
    <a href="../html/signin.html"><button type="button" class="signIN">Sign In</button></a>
    
    <a href="../html/signup.html"><button type="button" class="signUP">Sign Up</button></a>
    </div>
    </div>


    <div class="menu-toggle">
    <input type="checkbox">
        <span></span>
        <span></span>
        <span></span>
    </div>    
`
document.querySelector('nav').innerHTML = navbar;

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav .wrapper-responsive');
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('slide')
})