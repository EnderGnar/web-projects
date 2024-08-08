<?php
session_start();
require_once"config/dbconfig.php";

$verhalten=0;

if(!isset($_SESSION['username'])and !isset($_GET['page'])){
    $verhalten = 0;
}
if($_GET['page'] == 'log'){
    $user = $_POST['user'];
    $passwort = $_POST['passwort'];

$sql = $db->query('SELECT * FROM information');
$num =$sql->num_rows;
if($num >0){
    while($row = $sql->fetch_object()){
        $gespeichert =$row->username;

if($gespeichert == $user){
    $pwgesp = $row->password;
    $gefunden = true;
    if($pwgesp == $passwort){
            $verhalten = 1;
            $_SESSION['username']=$user;
        }else{

            $verhalten = 2;
    }
    }
    if(!$gefunden ==true){
        $verhalten = 2;
    }
}
}
}
?>
<html>
    <head>

        <title>Login</title>
        <?php
            if($verhalten ==1){
                ?>
                <meta http-equiv ='refresh' content='1; URL=pages/lobby.php?name=<?php echo $user;?>'>
        <?php
            }
        ?>
    </head>
    <body>
        <?php
            if($verhalten == 0){
        ?>
        Bitte logge dich ein:<br/>
        <form method='post' action='index.php?page=log'>
            Username: <input type='text' name ='user' /><br>
            Passwort:   <input type='password' name ='passwort' /><br><br>
            <input type='submit' value = 'Einloggen' /><br><br>
            Registriere dich <a href='pages/ausgabe.php'>hier</a>!
        </form>
        <?php
            }
            if($verhalten == 1){
        ?>

        Du hast dich richtig eingeloggt und wirst weitergeleitet!

        <?php
            }
            if($verhalten == 2){
        ?>
        Du hast dich nicht richtig Eingeloggt!! <br/>
        <a href='index.php'>Zurueck</a>
        <?php
            }
        ?>
    </body>
</html>