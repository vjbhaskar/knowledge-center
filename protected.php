<?php
// initialize session
session_start();

if(!isset($_SESSION['user'])) {
	// user is not logged in, do something like redirect to login.php
	header("Location: login.php");
	die();
}

if($_SESSION['access'] != 2) {
	// user is logged in but not a manager, redirect to bot
	header("Location: https://knowledge.liveperson.com.kudos-sxz6jmi-znm3eqs6brhzq.us.platform.sh/kudos.html");
  die();
}
?>

<p>Welcome <?= $_SESSION['user'] ?>!</p>

<p><strong>Secret Protected Content Here!</strong></p>

<p>Mary Had a Little Lamb</p>

<p><a href="login.php?out=1">Logout</a></p>
