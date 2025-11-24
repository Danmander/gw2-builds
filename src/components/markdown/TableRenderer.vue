<template>
    <table class="text-left bg-surface">
        <thead>
            <tr>
                <th
                    v-for="(headerContent, index) in headers"
                    :key="index"
                >
                    <elements-renderer :markdown="headerContent" />
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(rowCells, rowIndex) in data"
                :key="rowIndex"
            >
                <td
                    v-for="(cellContent, cellIndex) in rowCells"
                    :key="cellIndex"
                    class="bg-background"
                >
                    <elements-renderer :markdown="cellContent" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import ElementsRenderer from './ElementsRenderer.vue';

export default {
    components: {
        ElementsRenderer
    },
    props: {
        markdown: {
            type: String,
            required: true
        }
    },
    computed: {
        rows() {
            return this.markdown.trim().split("\n").map((row) => {
                const cells = row.split("|");
                // Remove the first and last element as they will always be empty due to the table starting with | and ending with |
                return cells.slice(1, cells.length - 1);
            });
        },
        headers() {
            return this.rows[0];
        },
        data() {
            // We remove the first row as these are the headers.
            // We remove the second row as well as these are the line between header and cell (that's just markdown standard, I don't like it either).
            // We also need to limit the amount of cells per row to fit the amount of columns.
            return this.rows?.slice(2, this.rows.length).map(row => row.slice(0, this.headers.length));
        }
    }
}
</script>

<style scoped>
table {
    width: 100%;
    line-height: 2;
    border-spacing: 0;
    border: 2px solid rgb(var(--v-theme-background));
    border-radius: 4px;
}

thead {
    line-height: 2;
    font-size: 1.17rem; /* The same size as a h3 tag */
}

/* thead th:not(:first-child) {
    border-left: 1px solid rgb(var(--v-theme-background));
}

thead th:not(:last-child) {
    border-right: 1px solid rgb(var(--v-theme-background));
} */

tbody td:not(:first-child) {
    border-left: 1px solid rgb(var(--v-theme-surface));
}

tbody td:not(:last-child) {
    border-right: 1px solid rgb(var(--v-theme-surface));
}

tbody tr:not(:first-child) td {
    border-top: 2px solid rgb(var(--v-theme-surface));
}
</style>