<script lang="ts">
let count = 0;

const increment = () => {
	count++;
};
</script>

<button on:click={increment}>
    {count}
</button>

<style>
    button {
        background-color: wheat;
    }
</style>