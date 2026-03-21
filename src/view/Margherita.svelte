<script lang="ts">
  import { IconRowInsertBottom } from "@tabler/icons-svelte";
  import Paper from "./components/Paper.svelte";
  import CalculatorRow from "./components/CalculatorRow.svelte";
  import WillametteMall from "/willamette-mall.mp3?url";
  import { type RowDetails, create as newRow } from "../@types/RowDetails.mts";

  let rows: RowDetails[] = $state([newRow()]);
  let disableDelete = $derived(rows.length === 1);

  function findRowIndex(row: RowDetails) {
    return rows.findIndex((r) => r.id === row.id);
  }
</script>

<div class="h-screen flex bg-no-repeat bg-cover bg-[url(/pizza.webp)]">
  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
  <div class="container mx-auto my-4 z-10">
    <div class="flex flex-col items-center gap-5">
      <span class="text-7xl font-lobster text-white text-shadow-lg/80">
        margherita
      </span>
      <div class="w-xl">
        <Paper>
          <div class="flex flex-col gap-2 w-full">
            <div class="flex flex-col gap-2">
              {#each rows as row}
                <CalculatorRow
                  {row}
                  {disableDelete}
                  setPrice={(n) => {
                    const index = findRowIndex(row);
                    rows[index].price = n;
                  }}
                  setSize={(n) => {
                    const index = findRowIndex(row);
                    rows[index].size = n;
                  }}
                  onDelete={() => {
                    const index = findRowIndex(row);
                    rows.splice(index, 1);
                  }}
                />
              {/each}
              <div>
                <button
                  class="btn btn-success w-full"
                  onclick={() => rows.push(newRow())}
                >
                  <IconRowInsertBottom /> Add Row
                </button>
              </div>
            </div>
            <div class="flex flex-col content-center items-center gap-2">
              <audio controls autoPlay loop>
                <source src={WillametteMall} type="audio/mp3" />
              </audio>
              <span class="caption-bottom text-xs">
                Willamette Mall Music is &copy; Capcom 2006
              </span>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  </div>
</div>
