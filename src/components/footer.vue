<script>

</script>

<template>
  <footer>
    <div class = "table">
        <div class="left">
            <p>
                Test Task, 2022
            </p>
        </div>
        <div class="right">
            <a href="tel: 518-363-2181">518-363-2181<br></a>
                <h5>
                91 Park St. Fairhope, AL 36532
              </h5>
        </div>
    </div>
  </footer>
</template>

<style scoped>
*{
    font-family: 'helvetica';
    padding: 0%;
    margin: 0%;
}
a{
    text-decoration: underline;
}
.table{
    flex-wrap: wrap;
    color: white;
    font-weight: bolder;
    padding-top: 8px;
    padding-left: 25px;
}
footer{
  background: #292c31;
  height: 70px;
}
.table a{
    color: white;
}

.left{
    padding-top: 15px;
    width: 85%;
}
.right{
    padding-top: 10px;
    text-align: left;
    float: right;
    width: 15%;
}
.left, .right{
    display: inline-block;
}

@media(max-width: 1355px){
.left{
    width: 70%;
}
.right{
    width: 30%;
}
}
</style>
