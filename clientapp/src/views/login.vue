<template>
    <div class="wrapper">
    <NavBar></NavBar>
    <div class="container">
        <div class="card mx-auto bg-light mt-5" style="width: 20rem;">
            <h5 class="card-header">Register</h5>

            <form class="m-4">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label mb-2" for="exampleCheck1">I aggre to </label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            
        </div>

    </div>

    </div>
</template>

<script>
    import NavBar from '../components/navbar.vue';
    export default {
        components: {
            NavBar
        },
        data() {
            return {
                val: '',
                error: '',
                snackbar: false
            }
        },
    }



</script>

<style >
    
</style>