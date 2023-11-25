<script>
    import eyeImg from '$lib/eye.svg'
    import trashImg from '$lib/trash.svg'
    import {createEventDispatcher} from "svelte";
    export let persona

    const dispatch = createEventDispatcher()
    function deletePersona() {
        dispatch('delete', {
            persona: persona
        })
    }

    function viewPersona() {
        dispatch('view', {
            persona: persona
        })
    }

</script>

<div class="outer-flex-container">
    <img class="img" src="{persona.thumbnail}" alt="">
    <div class="text-flex-container">
        <div class="name">{persona.firstname} {persona.lastname}</div>
        <div class="email">{persona.email}</div>
    </div>

    <div class="button-flex-container">
        <button class="eye" on:click={viewPersona}>
            <img src="{eyeImg}" alt="">
        </button>
        <button class="trash" on:click={deletePersona}>
            <img src="{trashImg}" alt="">
        </button>
    </div>
</div>

<style>

    .text-flex-container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        padding-right: 20px;
    }

    .outer-flex-container {
        display: flex;
        background-color: #A8DEEA;
        border-radius: 50px;
        flex-wrap: wrap;
        margin: 25px;
    }

    .button-flex-container {
        display: flex;
        visibility: hidden;
        flex-direction: column;
        width:150px;
    }

    .outer-flex-container:hover .button-flex-container {
        visibility: visible;
    }

    .button-flex-container:hover {
        cursor: pointer;
    }

    .eye {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #21D19F;
        flex-grow: 1;
        width: 150px;
        border-radius: 0 50px 0 0;
        border-width: 0;
        cursor: pointer;
    }

    .trash {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #BC0000;
        flex-grow: 1;
        width: 150px;
        border-radius: 0 0 50px 0;
        border-width: 0;
        cursor: pointer;
    }

    .name {
        color: #FFFFFF;
        font-size: 48px;
        font-weight: bold;
        font-family: Roboto, serif;
    }

    .email {
        color: #FFFFFF;
        font-size: 30px;
        font-weight: bold;
        font-family: Roboto, serif;
    }

    .img {
        margin: 20px;
        border-radius: 50%;
        height: 130px;
        width: 130px;
        border: 5px solid #FFF;
        align-self: center;
    }
</style>