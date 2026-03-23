<script lang="ts">
  import { IconRowInsertBottom } from "@tabler/icons-svelte";
  import Paper from "./components/Paper.svelte";
  import CalculatorRow from "./components/CalculatorRow.svelte";
  import WillametteMall from "/willamette-mall.mp3?url";
  import { type RowDetails, create as newRow } from "../@types/RowDetails.mts";
  import { type UserEnteredNumber } from "../@types/UserEnteredNumber.mts";

  let rows: RowDetails[] = $state([newRow()]);
  let disableDelete = $derived(rows.length === 1);

  function findRowIndex(row: RowDetails) {
    return rows.findIndex((r) => r.id === row.id);
  }
</script>

<div
  class="flex min-h-screen bg-[url(/pizza.webp)] bg-cover bg-fixed bg-no-repeat"
>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-xs"></div>
  <div class="z-10 container mx-auto my-4">
    <div class="flex flex-col items-center gap-5">
      <span class="font-lobster text-7xl text-white text-shadow-lg/80">
        margherita
      </span>
      <div class="w-md sm:w-xl">
        <Paper>
          <div class="flex w-full flex-col gap-2">
            <div class="flex flex-col gap-2">
              {#each rows as row (row.id)}
                <CalculatorRow
                  {row}
                  {disableDelete}
                  setPrice={(n: UserEnteredNumber) => {
                    rows[findRowIndex(row)].price = n;
                  }}
                  setSize={(n: UserEnteredNumber) => {
                    rows[findRowIndex(row)].size = n;
                  }}
                  onDelete={() => {
                    rows.splice(findRowIndex(row), 1);
                  }}
                />
              {/each}
              <div>
                <button
                  class="btn w-full btn-success"
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
