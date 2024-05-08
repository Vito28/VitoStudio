const navbar = `
    <div class="brand">
    <img src="../Image/Logo/web_design_studio.png" alt="logo">
    </div>
    <div class="wrapper-responsive">
    <div class="menu-list">
        <ul>
            <li><a href="">Home</a></li>
            <li><a href="">About Us</a></li>
            <li><a href="">Portofolio</a></li>
            <li><a href="">Contact</a></li>
        </ul>
        <div class="null"></div>
    </div>
    <div class="form_auth">
        <button type="button" class="signIN">Sign In</button>
        <button type="button" class="signUP">Sign Up</button>
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