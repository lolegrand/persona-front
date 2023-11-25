<script>
    import trashImg from '$lib/trash.svg'
    import phoneImg from '$lib/phone.svg'
    import mobileImg from '$lib/mobile.svg'
    import birthdayImg from '$lib/birthday.svg'
    import landmarkImg from '$lib/landmark.svg'
    import closeImg from '$lib/close.svg'
    import {createEventDispatcher} from "svelte";

    export let selectedPersona

    const dispatch = createEventDispatcher()

    function deletePersona() {
        if (selectedPersona != null) {
            dispatch('delete', {
                persona: selectedPersona
            })
            selectedPersona = null
        }
    }
</script>

{#if selectedPersona != null}
<div class="modal">
    <div class="modal-content">
        <div style="display: flex; flex-direction: column; width: 100%; flex-wrap: nowrap">
            <div class="image-flex-container">
                <img class="img" src="{selectedPersona.thumbnail}" alt="">
                <div class="text-flex-container">
                    <div class="name">{selectedPersona.firstname} {selectedPersona.lastname}</div>
                    <div class="email">{selectedPersona.email}</div>
                </div>
            </div>

            <dl>
                <dt>
                    <img src="{mobileImg}" alt="" class="icon">
                    {selectedPersona.mobile}
                </dt>

                <dt>
                    <img src="{landmarkImg}" alt="" class="icon">
                    {selectedPersona.street}, {selectedPersona.city}, {selectedPersona.state}, {selectedPersona.country}
                </dt>

                <dt>
                    <img src="{birthdayImg}" alt="" class="icon">
                    {selectedPersona.dob}
                </dt>

                <dt>
                    <img src="{phoneImg}" alt="" class="icon">
                    {selectedPersona.phone}
                </dt>
            </dl>

            <button class="trash" on:click={deletePersona}>
                <img src="{closeImg}" alt="">
            </button>
        </div>
    </div>
</div>
{/if}

<style>

    .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
        height: 50%;
        width: 60%;
        transform: translate(35%, 50%);
        display: flex;
        background-color: #A8DEEA;
        border-radius: 50px;
    }

    .image-flex-container {
        display: flex;
        background-color: #A8DEEA;
        border-radius: 50px;
        flex-wrap: wrap;
    }

    .text-flex-container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        padding-right: 20px;
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
        height: 150px;
        width: 150px;
        border: 5px solid #FFF;
        align-self: center;
    }

    .icon {
        height: 25px;
        width: 25px;
        margin-right: 25px;
    }

    dt {
        color: #FFFFFF;
        height: 25px;
        display: flex;
        align-items: center;
    }

    dl {
        margin: 0 0 20px 20px;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
    }

    .trash {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #21D19F;
        flex-grow: 1;
        height: 150px;
        border-radius: 0 0 50px 50px;
        border-width: 0;
        cursor: pointer;
    }

</style>
